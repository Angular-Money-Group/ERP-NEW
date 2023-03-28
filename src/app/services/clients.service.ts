import { OperationsDB } from "../db/operations.service";
import ClientsModel, { ClientType } from "../models/clientsSchema.model";
import UserModel from "../models/userSchema.models";
import { Logger } from "./logger.service";

export class ClientService {
    static async createClient(values: ClientType, id: string) {
        try {
            Logger.infoLog(`Creating client`);
            await OperationsDB.registerItem(values, ClientsModel)
                .then((client) => {
                    OperationsDB.addIdToRelatedCollection(id, client._id, "clients", UserModel);
                    Logger.infoLog(`Client created`);
                    return Promise.resolve(client);
                })
                .catch((error: any) => {
                    Logger.errorLog(error.message);
                    return Promise.reject(error.message);
                });
        } catch (error: any) {
            Logger.errorLog(error.message);
            return Promise.reject(error.message);
        }
    }
    
    static async addSaleToClient(saleID: string, cpfCnpj: string): Promise<any> {
        try {
            const client = await this.getClientByCpfCnpj(cpfCnpj);
    
            if (!client) {
                return Promise.reject(`Client not found`);
            }
    
            Logger.infoLog(`Adding sale to client`);
            client.purchases.push(saleID);
            await client.save();
    
            return Promise.resolve(client);
        } catch (error: any) {
            Logger.errorLog(error.message);
            Promise.reject(error.message);
        }
    }
    
    static async deleteClient(id: string) {
        try {
            Logger.infoLog(`Deleting client`);
            await OperationsDB.deleteItems(id, ClientsModel)
                .then(() => {
                    Logger.infoLog(`Client deleted`);
                    return Promise.resolve();
                })
                .catch((error: any) => {
                    Logger.errorLog(error.message);
                    return Promise.reject(error.message);
                });
        } catch (error: any) {
            Logger.errorLog(error.message);
            return Promise.reject(error.message);
        }
    }

    static async updateClient(id: string, items: any) {
        try {
            Logger.infoLog(`Updating client`);
            await OperationsDB.updateItems(id, items, ClientsModel)
                .then((client) => {
                    Logger.infoLog(`Client updated`);
                    return Promise.resolve(client);
                })
                .catch((error: any) => {
                    Logger.errorLog(error.message);
                    return Promise.reject(error.message);
                });
        } catch (error: any) {
            Logger.errorLog(error.message);
            return Promise.reject(error.message);
        }
    }
    
    static async getClientByCpfCnpj(cpfCnpj: string): Promise<any> {
        try {
            Logger.infoLog(`Getting client by cpf/cnpj`);
            const client = await ClientsModel.findOne({ cpfCnpj: cpfCnpj });
    
            if (!client) {
                Logger.errorLog(`Client not found`);
                return Promise.reject(`Client not found`);
            }
    
            Logger.infoLog(`Client found`);
            return Promise.resolve(client);
        } catch (error: any) {
            Logger.errorLog(error.message);
            Promise.reject(error.message);
        }
    }

    static async getClients(userID: string): Promise<any> {
        try {
            Logger.infoLog(`Getting clients`);

            const clients = await OperationsDB.getById(userID, UserModel, "Clients");

            if (!clients) {
                Logger.errorLog(`Clients not found`);
                return Promise.reject(`Clients not found`);
            }

            Logger.infoLog(`Clients found`);
            return Promise.resolve(clients);
        } catch (error: any) {
            Logger.errorLog(error.message);
            Promise.reject(error.message);
        }
    }

    static async getClientById(id: string) {
        try {
            Logger.infoLog(`Getting client by id`);
            const client = await OperationsDB.getById(id, ClientsModel);

            if (!client) {
                Logger.errorLog(`Client not found`);
                return Promise.reject(`Client not found`);
            }

            Logger.infoLog(`Client found`);
            return Promise.resolve(client);
        } catch (error: any) {
            Logger.errorLog(error.message);
            Promise.reject(error.message);
        }
    }


}
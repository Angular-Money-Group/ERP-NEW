import { createdResponse, unprocessableEntityResponse, badRequestResponse } from './../utils/responses.utils';
import { successResponse, internalServerErrorResponse } from '../utils/responses.utils';
import { ClientService } from './../services/clients.service';
import { Request, Response } from 'express';

export class ClientController {
    public static async getClients(req: Request, res: Response) {
        try {
            const clients = await ClientService.getClients(req.body.user._id);
            
            return successResponse(res, clients);

        } catch (error: any) {
            return internalServerErrorResponse(res, error.message);
        }
    }

    public static async getClientById(req: Request, res: Response) {
        try {
            const client = await ClientService.getClientById(req.params.id);

            return successResponse(res, client);

        } catch (error: any) {
            return internalServerErrorResponse(res, error.message);
        }
    }

    public static async createClient(req: Request, res: Response) {
        const { name, cpfcnpj, email, phone, cep, city, state, address, neighborhood, number, complement } = req.body;

        if (!name || !cpfcnpj || !email || !phone || !cep || !city || !state || !address || !number) {
            return unprocessableEntityResponse(res);
        }

        if (cpfcnpj.length < 11) {
            return unprocessableEntityResponse(res);
        }

        const clientExists = await ClientService.getClientByCpfCnpj(cpfcnpj);

        if(clientExists) {
            return badRequestResponse(res);
        }

        try {
            const client = await ClientService.createClient({ name, cpfcnpj, email, phone, cep, city, state, address, neighborhood, number, complement, purchases: [], createdAt: new Date() }, req.body.user._id);

            return createdResponse(res, client, 'Cliente');

        } catch (error: any) {
            return internalServerErrorResponse(res, error.message);
        }
    }

    public static async updateClient(req: Request, res: Response) {
        try {
            const client = await ClientService.updateClient(req.params.id, req.body);

            return successResponse(res, client);

        } catch (error: any) {
            return internalServerErrorResponse(res, error.message);
        }
    }

    public static async deleteClient(req: Request, res: Response) {
        try {
            await ClientService.deleteClient(req.params.id);

            return successResponse(res, 'Cliente deletado com sucesso!');

        } catch (error: any) {
            return internalServerErrorResponse(res, error.message);
        }
    }
}
import mongoose from "mongoose";

const clientsSchema = new mongoose.Schema({
    marketID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },
    name: String,
    cpfcnpj: String,
    email: String,
    phone: String,
    cep: String,
    city: String,
    state: String,
    neighborhood: String,
    address: String,
    number: String,
    complement: String,
    purchases: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Sales',
        }
    ],
    createdAt: Date,
});

const ClientsModel = mongoose.model('Clients', clientsSchema);

export default ClientsModel;

export interface ClientType {
    name: string;
    cpfcnpj: string;
    email: string;
    phone: string;
    cep: String,
    city: String,
    state: String,
    address: String,
    neighborhood: String,
    number: String,
    complement?: string | null,
    purchases: string[];
    createdAt: Date;
}
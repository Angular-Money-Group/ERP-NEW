import { ProductsSevice } from './../services/products.service';
import { SaleProduct } from './../models/saleSchema.models';
import { Sales } from './../services/sales.service';
import { badRequestResponse, successResponse } from './../utils/responses.utils';
import { Request, Response } from "express";
import {CashiersService} from "../services/cashier.service";
import { Logger } from "../services/logger.service";
import {
  internalServerErrorResponse
} from "../utils/responses.utils";
import { PaymentMethod } from '../models/saleSchema.models';
import { ClientService } from '../services/clients.service';

interface RequestCreateSale {
  products: SaleProduct[]; 
  totalSell: number;
  cpfcnpjClient: string;
  paymentMethods: PaymentMethod[];
  cashierID: string;
}

export const createSale = async (req: Request, res: Response) => {
  try {
    const { products, totalSell, cpfcnpjClient, paymentMethods, cashierID }: RequestCreateSale =
    req.body;

    Logger.infoLog(`Cashier found`);
    
    const sale = await Sales.createSale({
      user: req.body.user,
      products,
      totalSell,
      cpfcnpjClient,
      paymentMethods,
      state: "Fechado",
      createdAt: new Date(),
     })

    Logger.infoLog(`Sale created`);

    await CashiersService.addSellToCashier({
      user: req.body.user,
      sellID: sale._id,
      date: Date.now(),
    }, cashierID).then((cashier) => {
      Logger.infoLog(`Cashier updated`);
      return cashier;
    })
    
    if(cpfcnpjClient){
      const isClient = await ClientService.getClientByCpfCnpj(cpfcnpjClient);
      
      if (!isClient) {
        await ClientService.createClient({
          name: "",
          cpfcnpj: cpfcnpjClient,
          email: "",
          phone: "",
          cep: "",
          city: "",
          state: "",
          neighborhood: "",
          address: "",
          number: "",
          purchases: [sale._id],
          createdAt: new Date(),
        }, req.body.user._id);
      } else {
        await ClientService.addSaleToClient(sale._id, cpfcnpjClient);
      }

    }

    await ProductsSevice.updateStock(products);
    return successResponse(res, sale);
  
  } catch (error: any) {
    Logger.errorLog(error.message);
    return internalServerErrorResponse(res, error.message);
  }
};

export const getSaleByDay = async (req: Request, res: Response) => {
  try {
    var { day } = req.body;

    day = new Date(day);

    Logger.infoLog(`Getting sales by day: ${day}`);
    const sales = await Sales.getSaleByDay(day).then((sales) => sales);

    if (!sales) {
      Logger.errorLog(`Sales not found`);
      return badRequestResponse(res);
    }

    Logger.infoLog(`Sales found`);
    return successResponse(res, sales);

  } catch (error: any) {
    Logger.errorLog(error.message);
    return internalServerErrorResponse(res, error.message);
  }
};

export const getSaleById = async (req: Request, res: Response) => {
  try {
    const { id } =
      req.body;

      Logger.infoLog(`Sale ID: ${id}`);
      const sale = Sales.getSaleById(id).then((sale) => sale);

      if (!sale) {
        Logger.errorLog(`Sale ID: ${id} not found`);
        return badRequestResponse(res);
      }

      Logger.infoLog(`Sale ID: ${id} found`);
      return successResponse(res, sale);

  } catch (error: any) {
    Logger.errorLog(error.message);
    return internalServerErrorResponse(res, error.message);
  }
};

export default { createSale, getSaleByDay, getSaleById };
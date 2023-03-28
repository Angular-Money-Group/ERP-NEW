import { OperationsDB } from "../db/operations.service";
import SaleModel, { SaleType } from "../models/saleSchema.models";
import { Logger } from "./logger.service";

export class Sales {
  public static async createSale(values: SaleType): Promise<any> {
    try {
      Logger.infoLog(`Creating sale`);
      await OperationsDB.registerItem(values, SaleModel)
        .then((sale) => {
          Logger.infoLog(`Sale created`);
          return Promise.resolve(sale);
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

  static async updateSale() {}

  static async deleteSale() {}

  static async getSaleById(id: string): Promise<any> {
    try {
      Logger.infoLog(`Getting sale by id: ${id}`);
      const sale = await OperationsDB.getById(id, SaleModel);

      if (!sale) {
        Logger.errorLog(`Sale not found`);
        return Promise.reject(`Sale not found`);
      }

      Logger.infoLog(`Sale found`);
      return Promise.resolve(sale);
    } catch (error: any) {
      Logger.errorLog(error.message);
      Promise.reject(error.message);
    }
  }

  public static async getSaleByDay(day: string): Promise<any> {
    try {
      Logger.infoLog(`Getting sale by day: ${day}`);
      const sale = await OperationsDB.getItemsByDay(day, SaleModel);

      if (!sale) {
        Logger.errorLog(`Sale not found`);
        return Promise.reject(`Sale not found`);
      }

      Logger.infoLog(`Sale found`);
      return Promise.resolve(sale);
    } catch (error: any) {
      Logger.errorLog(error.message);
      Promise.reject(error.message);
    }
  }
}

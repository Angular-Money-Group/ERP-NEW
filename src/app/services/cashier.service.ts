import { OperationsDB } from "../db/operations.service";
import { Logger } from "./logger.service";
import CashierModel from "../models/cashiersSchema.model";

export class CashiersService {
  static async createCashier() {
    
  }

  static async updateCashier() {}

  static async deleteCashier(id: string) {
    try {
      return Promise.resolve(await OperationsDB.deleteItems(id, CashierModel));
    } catch (error: any) {
      Logger.errorLog(error.message);
      Promise.reject(error.message);
    }
  }

  static async getCashierById(id: string): Promise<any> {
    try {
      return Promise.resolve(await OperationsDB.getById(id, CashierModel));
    } catch (error: any) {
      Logger.errorLog(error.message);
      Promise.reject(error.message);
    }
  }

  public static async addSellToCashier(sell: any, cashierId: string) {
    try {
      const cashier = await this.getCashierById(cashierId);
      
      if (!cashier) {
        return Promise.reject(`Cashier not found`);
      }

      cashier.sells.push(sell);
      await cashier.save();

      return Promise.resolve(cashier);
    } catch (error: any) {
      Logger.errorLog(error.message);
      Promise.reject(error.message);
    }
  }
}
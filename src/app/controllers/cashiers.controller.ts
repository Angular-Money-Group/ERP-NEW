import { Logger } from "./../services/logger.service";
import {
  notFoundResponse,
  createdResponse,
  successResponse,
  internalServerErrorResponse,
  unprocessableEntityResponse,
  paymentRequiredResponse,
} from "./../utils/responses.utils";
import { Request, Response } from "express";
import CashierModel, { Cashier } from "../models/cashiersSchema.model";
import { CashiersService } from "../services/cashier.service";

export class CashiersController {
  public static async getCashiers(req: Request, res: Response) {
    try {
      const cashiers = await CashierModel.find({ user: req.body.user._id });
      return successResponse(res, cashiers);
    } catch (error: any) {
      return internalServerErrorResponse(res, error.message);
    }
  }

  public static async getCashierById(req: Request, res: Response) {
    try {
      const cashier = await CashierModel.findById(req.params.id);
      return successResponse(res, cashier);
    } catch (error: any) {
      return internalServerErrorResponse(res, error.message);
    }
  }

  public static async createCashier(req: Request, res: Response) {
    try {
      const cashier: Cashier = req.body;

      cashier.user = req.body.user._id;

      const totalCashiers = await CashierModel.find({
        user: req.body.user._id,
      });

      if (totalCashiers.length >= 3) {
        paymentRequiredResponse(res);
      }

      cashier.createdAt = new Date();

      const newCashier = await CashierModel.create(cashier);
      return createdResponse(res, newCashier, "Caixa");
    } catch (error: any) {
      return internalServerErrorResponse(res, error.message);
    }
  }

  public static async updateCashier(req: Request, res: Response) {
    const { id } = req.params;
    const cashier: Cashier = req.body;

    cashier.updatedAt = new Date();

    try {
      const updatedCashier = await CashierModel.findByIdAndUpdate(id, cashier, {
        new: true,
      });

      if (!updatedCashier) {
        return unprocessableEntityResponse(res);
      }

      return successResponse(res, updatedCashier);
    } catch (error: any) {
      Logger.errorLog(error.message);
      return internalServerErrorResponse(res, error.message);
    }
  }

  public static async deleteCashier(req: Request, res: Response) {
    const { id } = req.params;
    try {
      const deletedCashier = await CashierModel.findByIdAndDelete(id);
      if (!deletedCashier) {
        return notFoundResponse(res);
      }
      Logger.infoLog(`Cashier ${id} deleted`);
      return successResponse(res, deletedCashier);
    } catch (error: any) {
      Logger.errorLog(error.message);
      return internalServerErrorResponse(res, error.message);
    }
  }

  public static async closeCashier(req: Request, res: Response) {
    const { id } = req.params;
    const { totalCash } = req.body;

    if (!totalCash) {
      Logger.errorLog("Total cash is required");
      return unprocessableEntityResponse(res);
    }

    try {
      Logger.infoLog(`Closing cashier ${id}`);
      const cashier = await CashiersService.getCashierById(id);

      if (!cashier) {
        return notFoundResponse(res);
      }

      Logger.infoLog(`Cashier ${id} found`);
      cashier.totalCash = totalCash;
      cashier.status = "Fechado";
      cashier.updatedAt = new Date();
      cashier.history.push({
        user: req.body.user._id,
        operation: "Fechamento",
        value: totalCash,
        date: Date.now(),
      });

      Logger.infoLog(`Saving cashier ${id}`);
      await cashier.save();

      return successResponse(res, cashier);
    } catch (error: any) {
      Logger.errorLog(error.message);
      return internalServerErrorResponse(res, error.message);
    }
  }

  public static async openCashier(req: Request, res: Response) {
    const { id } = req.params;
    const { totalCash } = req.body;

    if (!totalCash) {
      Logger.errorLog("Total cash is required");
      return unprocessableEntityResponse(res);
    }

    try {
      Logger.infoLog(`Closing cashier ${id}`);
      const cashier = await CashiersService.getCashierById(id);

      if (!cashier) {
        return notFoundResponse(res);
      }

      Logger.infoLog(`Cashier ${id} found`);
      cashier.totalCash = totalCash;
      cashier.status = "Aberto";
      cashier.updatedAt = new Date();
      cashier.history.push({
        user: req.body.user._id,
        operation: "Abertura",
        value: totalCash,
        date: Date.now(),
      });

      Logger.infoLog(`Saving cashier ${id}`);
      await cashier.save();

      return successResponse(res, cashier);
    } catch (error: any) {
      Logger.errorLog(error.message);
      return internalServerErrorResponse(res, error.message);
    }
  }

  public static async addMoneyFromCashier(req: Request, res: Response) {
    const { id } = req.params;
    const { value } = req.body;

    if (!value) {
      Logger.errorLog("Value is required");
      return unprocessableEntityResponse(res);
    }

    try {
      Logger.infoLog(`Adding money to cashier ${id}`);
      const cashier = await CashiersService.getCashierById(id);

      if (!cashier) {
        Logger.errorLog(`Cashier ${id} not found`);
        return notFoundResponse(res);
      }

      Logger.infoLog(`Cashier ${id} found`);
      cashier.totalCash += value;
      cashier.updatedAt = new Date();
      cashier.history.push({
        user: req.body.user._id,
        operation: "Entrada",
        value: value,
        date: Date.now(),
      });

      Logger.infoLog(`Saving cashier ${id}`);
      await cashier.save();

      return successResponse(res, cashier);
    } catch (error: any) {
      Logger.errorLog(error.message);
      return internalServerErrorResponse(res, error.message);
    }
  }

  public static async removeMoneyFromCashier(req: Request, res: Response) {
    const { id } = req.params;
    const { value } = req.body;

    if (!value) {
      Logger.errorLog("Value is required");
      return unprocessableEntityResponse(res);
    }

    try {
      const cashier = await CashiersService.getCashierById(id);

      if (!cashier) {
        Logger.errorLog(`Cashier ${id} not found`);
        return notFoundResponse(res);
      }

      if (cashier.totalCash < value) {
        Logger.errorLog(`Cashier ${id} has no money`);
        return unprocessableEntityResponse(res);
      }

      Logger.infoLog(`Cashier ${id} found`);
      cashier.totalCash -= value;
      cashier.updatedAt = new Date();
      cashier.history.push({
        user: req.body.user._id,
        operation: "Saída",
        value: value,
        date: Date.now(),
      });

      Logger.infoLog(`Saving cashier ${id}`);

      await cashier.save();

      return successResponse(res, cashier);
    } catch (error: any) {
      Logger.errorLog(error.message);
      return internalServerErrorResponse(res, error.message);
    }
  }

  public static async getHistory(req: Request, res: Response) {
    const { id } = req.params;

    try {
      const cashier = await CashiersService.getCashierById(id);

      if (!cashier) {
        Logger.errorLog(`Cashier ${id} not found`);
        return notFoundResponse(res);
      }

      Logger.infoLog(`Cashier ${id} found`);
      return successResponse(res, cashier.history);
    } catch (error: any) {
      Logger.errorLog(error.message);
      return internalServerErrorResponse(res, error.message);
    }
  }
}

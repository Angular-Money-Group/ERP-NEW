import { successResponse } from './../utils/responses.utils';
import { Request, Response } from "express";
import ProductSchema from "../models/productsSchema.models";
import SaleSchema from "../models/saleSchema.models";
import PatrimonySchema from "../models/patrimonySchema.model";

export class DashboardController {
  public static async getDashboard(req: Request, res: Response) {
    const { startDate, endDate }: any = req.query;

    const products = await ProductSchema.find({
      user: req.body.user._id,
      realStock: { $gt: 0 },
      priceSell: { $gt: 0 },
    });

    const sales = await SaleSchema.find({
      user: req.body.user._id,
      createdAt: {
        $gte: new Date(startDate),
        $lte: new Date(endDate),
      },
    });

    const patrimony = await PatrimonySchema.find({
      user: req.body.user._id,
      isActive: true,
    });

    var totalSell = {
      allDays: 0,
      days: [
        { day: 1, value: 0 },
        { day: 2, value: 0 },
        { day: 3, value: 0 },
        { day: 4, value: 0 },
        { day: 5, value: 0 },
        { day: 6, value: 0 },
        { day: 7, value: 0 },
        { day: 8, value: 0 },
        { day: 9, value: 0 },
        { day: 10, value: 0 },
        { day: 11, value: 0 },
        { day: 12, value: 0 },
        { day: 13, value: 0 },
        { day: 14, value: 0 },
        { day: 15, value: 0 },
        { day: 16, value: 0 },
        { day: 17, value: 0 },
        { day: 18, value: 0 },
        { day: 19, value: 0 },
        { day: 20, value: 0 },
        { day: 21, value: 0 },
        { day: 22, value: 0 },
        { day: 23, value: 0 },
        { day: 24, value: 0 },
        { day: 25, value: 0 },
        { day: 26, value: 0 },
        { day: 27, value: 0 },
        { day: 28, value: 0 },
        { day: 29, value: 0 },
        { day: 30, value: 0 },
        { day: 31, value: 0 },
      ],
    };

    var totalStock = 0;
    var totalPatrimony = 0;

    products.forEach((product: any) => {
      totalStock += product.priceSell * product.realStock;
    });

    patrimony.forEach((patrimony: any) => {
        totalPatrimony += patrimony.priceCost * patrimony.realStock;
    });

    sales.forEach((sale: any) => {
        totalSell.allDays += sale.totalPrice;
        totalSell.days.forEach((day: any) => {
            if(day.day === sale.createdAt.getDate()) {
              day.value = sale.totalSell;
            }
          });
        });

    return successResponse(res, {
      totalStock,
      totalSell,
      totalPatrimony
    })
  }
}

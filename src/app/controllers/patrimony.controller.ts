import { successResponse, createdResponse } from './../utils/responses.utils';
import { Request, Response } from "express";
import { findPaginated, getNextSequenceValue } from "../utils/pagination.utils";
import patrimonySchema from "../models/patrimonySchema.model";

interface IPagination {
  page?: number;
  limit?: number;
  filter?: string;
  sort?: any;
}

export class PatrimonyController {
  public static async getPatrimony(req: Request, res: Response) {
    const { page, limit, filter } = req.query as IPagination;

    const options = {
      page: parseInt(page as unknown as string) || 1,
      limit: parseInt(limit as unknown as string) || 10,
      sort: { createdAt: -1 },
    };

    if (filter) {
      const patrimonyByName = await findPaginated(
        patrimonySchema,
        options.page,
        options.limit,
        { user: req.body.user._id, name: { $regex: filter, $options: "i" } },
        options.sort
      );

      let patrimonyByPatrimonyNumber = await findPaginated(
        patrimonySchema,
        options.page,
        options.limit,
        {
          user: req.body.user._id,
          patrimonyNumber: { $regex: filter, $options: "i" },
        }
      );

      let allProducts =
        patrimonyByName.length > 0
          ? patrimonyByName
          : patrimonyByPatrimonyNumber;

      return res
        .status(200)
        .json({ message: "Operação realizada com sucesso", data: allProducts });
    } else {
      const patrimony = await findPaginated(
        patrimonySchema,
        options.page,
        options.limit,
        { user: req.body.user._id },
        options.sort
      );
      return successResponse(res, patrimony)
    }
  }

  public static async createPatrimony(req: Request, res: Response) {
    const { name, priceCost, description, category, initialStock } = req.body;

    if (!name || !priceCost || !description || !category || !initialStock) {
      return res.status(400).json({ message: "Dados inválidos" });
    }

    const user = req.body.user._id;
    const patrimony = await patrimonySchema.create({
      name,
      patrimonyNumber: await getNextSequenceValue("patrimonyId"),
      description,
      category,
      priceCost,
      initialStock,
      isActive: true,
      createdAt: new Date(),
      user,
    });
    return createdResponse(res, patrimony, "patrimony")
  }

  public static async updatePatrimony(req: Request, res: Response) {
    const { isActive, observation } = req.body;

    const user = req.body.user._id;
    const patrimony = await patrimonySchema.findOneAndUpdate(
      { _id: req.params.id, user },
      { isActive, observation, updatedAt: new Date() },
      { new: true }
    );
    return successResponse(res, patrimony)
  }

  public static async deletePatrimony(req: Request, res: Response) {
    const user = req.body.user._id;
    await patrimonySchema.deleteOne({
      _id: req.params.id,
      user,
    });

    return successResponse(res, null)
  }

    public static async getPatrimonyById(req: Request, res: Response) {
    const user = req.body.user._id;
    const patrimony = await patrimonySchema.findOne({
        _id: req.params.id,
        user,
    });

    return successResponse(res, patrimony)
    }
}


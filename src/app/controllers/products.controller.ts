import { successResponse, internalServerErrorResponse, forbiddenResponse, notFoundResponse, badRequestResponse } from './../utils/responses.utils';
import { Request, Response } from "express";
import productsSchema from "../models/productsSchema.models";
import xlsx from "xlsx";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { findPaginated } from "../utils/pagination.utils";
import fs from "fs";
import ExcelJS from "exceljs";

dotenv.config();

export default class ProductsController {
  public static async getProducts(req: Request, res: Response) {
    const { page, limit, filter } = req.query;

    const options = {
      page: parseInt(page as unknown as string) || 1,
      limit: parseInt(limit as unknown as string) || 10,
      sort: { createdAt: -1 },
    };

    if (filter) {
      const productsByName = await findPaginated(
        productsSchema,
        options.page,
        options.limit,
        { user: req.body.user._id, name: { $regex: filter, $options: "i" } },
        options.sort
      );

      let productsByBarCode = await findPaginated(
        productsSchema,
        options.page,
        options.limit,
        { user: req.body.user._id, barCode: { $regex: filter, $options: "i" } },
        options.sort
      );

      let allProducts =
        productsByName.length > 0 ? productsByName : productsByBarCode;
      console.log(productsByName);
      return successResponse(res, {
        docs: allProducts,
        page: options.page,
        limit: options.limit,
        totalPages: Math.ceil(allProducts.length / options.limit),
      }
      )
    } else {
      const products = await findPaginated(
        productsSchema,
        options.page,
        options.limit,
        { user: req.body.user._id },
        options.sort
      );
      return successResponse(res, {
        docs: products,
        page: options.page,
        limit: options.limit,
        totalPages: Math.ceil(products.length / options.limit),
      });
    }
  }

  public static async getProductById(req: Request, res: Response) {
    const { id } = req.params;
    const product = await productsSchema.findById(id);

    if (!product) {
      return notFoundResponse(res);
    }

    return successResponse(res, product);
  }

  public static async createProduct(req: Request, res: Response) {
    const {
      name,
      priceCost,
      priceSell,
      barCode,
      description,
      category,
      initialStock,
    } = req.body;

    try {
      if (
        !name ||
        !priceCost ||
        !priceSell ||
        !barCode ||
        !description ||
        !category ||
        !initialStock
      ) {
        return badRequestResponse(res);
      }

      const product = new productsSchema({
        name,
        priceCost,
        priceSell,
        barCode,
        description,
        category,
        initialStock,
        moveStock: 0,
        realStock: initialStock,
        user: req.body.user._id,
      });

      await product
        .save()
        .then((product) => {
          return successResponse(res, product);
        })
        .catch((err) => {
          console.log(err);
          return internalServerErrorResponse(res, err.message);
        });
    } catch (error: any) {
      return internalServerErrorResponse(res, error.message);
    }
  }

  public static async updateProduct(req: Request, res: Response) {
    const { id } = req.params;
    const {
      name,
      priceCost,
      priceSell,
      barCode,
      description,
      category,
      moveStock,
    } = req.body;

    try {
      const product = await productsSchema.findById(id);

      if (!product) {
        return notFoundResponse(res);
      }

      product.name = name;
      product.priceCost = priceCost;
      product.priceSell = priceSell;
      product.barCode = barCode;
      product.description = description;
      product.category = category;
      product.moveStock = moveStock;
      product.realStock += moveStock;

      await product
        .save()
        .then((product) => {
          return successResponse(res, product);
        })
        .catch((err) => {
          console.log(err);
          return internalServerErrorResponse(res, err.message);
        });
    } catch (error: any) {
      return internalServerErrorResponse(res, error.message);
    }
  }

  public static async deleteProduct(req: Request, res: Response) {
    const { id } = req.params;

    try {
      await productsSchema.findByIdAndDelete(id);

      return successResponse(res, {});
    } catch (error: any) {
      return internalServerErrorResponse(res, error.message);
    }
  }

  public static async importProductsExcel(req: Request, res: Response) {
    try {
      if (!req.file) throw new Error("No file uploaded");
      let id = "";
      const authHeader = req.headers.authorization;
      const token = authHeader && authHeader.split(" ")[1];
      jwt.verify(token!, process.env.ACCESS_TOKEN_SECRET!, (err, user: any) => {
        if (err) {
          return forbiddenResponse(res);
        }

        id = user._id;
      });

      // lê o arquivo excel
      const workbook = xlsx.readFile(req.file.path);
      const sheetName = workbook.SheetNames[0];
      const sheet = workbook.Sheets[sheetName];

      // converte os dados do excel para um array de objetos
      const data: any = xlsx.utils.sheet_to_json(sheet);

      // deleta o arquivo excel
      fs.unlink(req.file.path, (error) => {
        if (error) {
          console.log(error);
        }
      });

      importproducts(data, id)

      return successResponse(res, data.slice(0, 10));
    } catch (error: any) {
      return internalServerErrorResponse(res, error.message);
    }
  }

  public static async exportProductsExcel(req: Request, res: Response) {
    try {
      const data = await productsSchema.find({ user: req.body.user._id });

      // cria um novo workbook e worksheet
      const workbook = new ExcelJS.Workbook();
      const worksheet = workbook.addWorksheet("Products");

      worksheet.columns = [
        { header: "Nome do Produto", key: "name", width: 100 },
        { header: "Preço de Custo", key: "priceCost", width: 10 },
        { header: "Preço de Venda", key: "priceSell", width: 10 },
        { header: "Código de Barras", key: "barCode", width: 20 },
        { header: "Descrição", key: "description", width: 100 },
        { header: "Categoria", key: "category", width: 20 },
        { header: "Estoque", key: "realStock", width: 10 },
      ];

      // adiciona os dados na planilha
      data.forEach((row) => {
        worksheet.addRow(row);
      });
      // configura a resposta do servidor para download do arquivo
      res.setHeader(
        "Content-Type",
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
      );
      res.setHeader(
        "Content-Disposition",
        "attachment; filename=" + "products.xlsx"
      );

      // escreve o arquivo Excel no response do servidor
      await workbook.xlsx.write(res);
      res.end();

      return successResponse(res, {})
    } catch (error: any) {
      return res.status(500).json({ message: error.message });
    }
  }
}


async function importproducts(data: any, id: any) {
  for (const product of data) {

    const productExists: any = await productsSchema.findOne({
      barCode: product.barCode,
    });

    product.user = id;

    if (product.priceCost) {
      product.priceCost = parseFloat(product.priceCost);
    }

    if (product.priceSell) {
      product.priceSell = parseFloat(product.priceSell);   
    }

    if (product.realStock) {
      product.realStock = parseInt(product.realStock);
    }
    
    product.moveStock = 0;
    product.initialStock = product.realStock;

    if(!productExists || productExists.length === 0) {

    product.createdAt = new Date();

    const newProduct = new productsSchema(product);
    
    await newProduct
      .save()
      .then((product: any) => {
        console.log("New", product);
      })
      .catch((err: any) => {
        console.log(err);
      });
    } else {
      productExists.name = product.name;
      productExists.priceCost = product.priceCost;
      productExists.priceSell = product.priceSell;
      productExists.barCode = product.barCode;
      productExists.description = product.description;
      productExists.category = product.category;
      productExists.initialStock = product.initialStock;
      productExists.moveStock = product.moveStock;
      productExists.realStock = product.realStock;
      productExists.updatedAt = new Date();

      await productExists
        .save()
        .then((product: any) => {
          console.log("Update", product);
        })
        .catch((err: any) => {
          console.log(err);
        });
    }
    
  }
}
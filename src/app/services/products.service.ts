import { Logger } from './logger.service';
import { OperationsDB } from './../db/operations.service';
import productsSchema from "../models/productsSchema.models";

export class ProductsSevice {
    static async createProduct() {}
    static async updateProduct() {}
    static async deleteProduct() {}
    static async getProductById() {}

    public static async updateStock(products: any[]): Promise<any> {
        try{
          products.forEach(async (product) => {
            const productDB = await OperationsDB.getById(product.id, productsSchema);

            if (!productDB) {
              Logger.errorLog(`Product not found`);
            } else {
                Logger.infoLog(`Product found`);
                productDB.realStock = productDB.realStock - product.quantity;
                productDB.moveStock = product.quantity;
                Logger.infoLog(`Product stock updated`);

                await productDB.save();
                return Promise.resolve(productDB);
            }
          });
        } catch (err: any) {
          Logger.errorLog(err.message);
        }
      }
}
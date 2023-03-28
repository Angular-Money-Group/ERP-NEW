import express from "express";
const productsRouter = express.Router();
import cors from "cors";
import ProductsController from "../controllers/products.controller";
import { authenticateToken, verifyPermission } from "../utils/verifytoken";
import multer, { MulterError } from 'multer';

const upload = multer({ dest: 'uploads/' });

productsRouter.get(
  "/products",
  cors(),
  authenticateToken,
  ProductsController.getProducts
);

productsRouter.get(
  "/products/:id",
  cors(),
  authenticateToken,
  ProductsController.getProductById
);

productsRouter.post(
  "/products",
  cors(),
  authenticateToken,
  verifyPermission,
  ProductsController.createProduct
);

productsRouter.put(
  "/products/:id",
  cors(),
  authenticateToken,
  verifyPermission,
  ProductsController.updateProduct
);
productsRouter.delete(
  "/products/:id",
  cors(),
  authenticateToken,
  verifyPermission,
  ProductsController.deleteProduct
);

productsRouter.post(
  "/stock/import",
  cors(),
  authenticateToken,
  verifyPermission,
  upload.single('file'),
  ProductsController.importProductsExcel
);
productsRouter.get(
  "/stock/export",
  cors(),
  authenticateToken,
  verifyPermission,
  ProductsController.exportProductsExcel
);

export default productsRouter;
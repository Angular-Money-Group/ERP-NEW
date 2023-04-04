import express from "express";
const productsRouter = express.Router();
import cors from "cors";
import ProductsController from "../controllers/products.controller";
import { authenticateToken, verifyPermission } from "../utils/verifytoken";
import multer, { MulterError } from "multer";

const upload = multer({ dest: "uploads/" });

productsRouter.get(
  "/",
  cors(),
  authenticateToken,
  ProductsController.getProducts
);

productsRouter.get(
  "/:id",
  cors(),
  authenticateToken,
  ProductsController.getProductById
);

productsRouter.post(
  "/",
  cors(),
  authenticateToken,
  verifyPermission,
  ProductsController.createProduct
);

productsRouter.put(
  "/:id",
  cors(),
  authenticateToken,
  verifyPermission,
  ProductsController.updateProduct
);
productsRouter.delete(
  "/:id",
  cors(),
  authenticateToken,
  verifyPermission,
  ProductsController.deleteProduct
);

productsRouter.post(
  "/stock",
  cors(),
  authenticateToken,
  verifyPermission,
  upload.single("file"),
  ProductsController.importProductsExcel
);
productsRouter.get(
  "/stock",
  cors(),
  authenticateToken,
  verifyPermission,
  ProductsController.exportProductsExcel
);

export default productsRouter;

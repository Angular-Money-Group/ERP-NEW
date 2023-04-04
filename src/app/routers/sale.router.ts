import { Router } from "express";

import SaleControler from "../controllers/sale.controller";
import { authenticateToken } from "../utils/verifytoken";

const saleRouter = Router();

saleRouter.get("/", authenticateToken, SaleControler.getSaleByDay);
saleRouter.get("/:id", authenticateToken, SaleControler.getSaleById);
saleRouter.post("/", authenticateToken, SaleControler.createSale);

export default saleRouter;

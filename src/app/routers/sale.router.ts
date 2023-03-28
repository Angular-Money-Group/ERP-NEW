import { Router } from "express";

import SaleControler from "../controllers/sale.controller";

const saleRouter = Router();

saleRouter.get("/", SaleControler.getSaleByDay);
saleRouter.get("/:id", SaleControler.getSaleById);
saleRouter.post("/", SaleControler.createSale);

export default saleRouter;

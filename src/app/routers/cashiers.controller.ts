import { CashiersController } from './../controllers/cashiers.controller';
import { Router } from "express";

const cashiersRouter = Router();

cashiersRouter.get("/", CashiersController.getCashiers);
cashiersRouter.get("/:id", CashiersController.getCashierById);
cashiersRouter.get("/history/:id", CashiersController.getHistory);
cashiersRouter.post("/", CashiersController.createCashier);
cashiersRouter.post("/addCash/:id", CashiersController.addMoneyFromCashier);
cashiersRouter.post("/removeSell/:id", CashiersController.removeMoneyFromCashier);
cashiersRouter.put("/:id", CashiersController.updateCashier);
cashiersRouter.delete("/:id", CashiersController.deleteCashier);

export default cashiersRouter;

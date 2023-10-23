import { authenticateToken } from '../utils/verifytoken';
import { CashiersController } from '../controllers/cashiers.controller';
import { Router } from "express";

const cashiersRouter = Router();

cashiersRouter.get("/", authenticateToken, CashiersController.getCashiers);
cashiersRouter.post("/", authenticateToken, CashiersController.createCashier);

cashiersRouter.get("/:id", authenticateToken, CashiersController.getCashierById);
cashiersRouter.put("/:id", authenticateToken, CashiersController.updateCashier);
cashiersRouter.delete("/:id", authenticateToken, CashiersController.deleteCashier);

cashiersRouter.get("/history/:id", authenticateToken, CashiersController.getHistory);

cashiersRouter.post("/closeCashier/:id", authenticateToken, CashiersController.closeCashier)
cashiersRouter.post("/openCashier/:id", authenticateToken, CashiersController.openCashier)

cashiersRouter.post("/addCash/:id", authenticateToken, CashiersController.addMoneyFromCashier);
cashiersRouter.post("/removeCash/:id", authenticateToken, CashiersController.removeMoneyFromCashier);


export default cashiersRouter;

import { Router } from "express";
import {PatrimonyController} from "../controllers/patrimony.controller";
import { authenticateToken } from "../utils/verifytoken";

const patrimonyRouter = Router();

patrimonyRouter.get("/", authenticateToken, PatrimonyController.getPatrimony);
patrimonyRouter.get("/:id", authenticateToken, PatrimonyController.getPatrimonyById);
patrimonyRouter.post("/", authenticateToken, PatrimonyController.createPatrimony);
patrimonyRouter.put("/:id", authenticateToken, PatrimonyController.updatePatrimony);
patrimonyRouter.delete("/:id", authenticateToken, PatrimonyController.deletePatrimony);

export default patrimonyRouter;
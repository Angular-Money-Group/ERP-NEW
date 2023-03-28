import { Router } from "express";
import {PatrimonyController} from "../controllers/patrimony.controller";

const patrimonyRouter = Router();

patrimonyRouter.get("/", PatrimonyController.getPatrimony);
patrimonyRouter.get("/:id", PatrimonyController.getPatrimonyById);
patrimonyRouter.post("/", PatrimonyController.createPatrimony);
patrimonyRouter.put("/:id", PatrimonyController.updatePatrimony);
patrimonyRouter.delete("/:id", PatrimonyController.deletePatrimony);

export default patrimonyRouter;
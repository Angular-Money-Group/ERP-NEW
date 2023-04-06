import { Router } from "express";
import { authenticateToken } from "../utils/verifytoken";
import { ClientController } from "../controllers/client.controller";

const clientRouter = Router();

clientRouter.get("/", authenticateToken, ClientController.getClients);
clientRouter.post("/", authenticateToken, ClientController.createClient);
clientRouter.get("/:id", authenticateToken, ClientController.getClientById);
clientRouter.put("/:id", authenticateToken, ClientController.updateClient);
clientRouter.delete("/:id", authenticateToken, ClientController.deleteClient);

export default clientRouter;
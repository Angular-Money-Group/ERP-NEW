import express from "express";
import dotenv from "dotenv";
import { connection } from "./app/db/database";
import cors from "cors";
import authRouter from "./app/routers/auth.router";
import productsRouter from "./app/routers/products.router";
import patrimonyRouter from "./app/routers/patrimony.router";
import dashboardRouter from "./app/routers/dashboard.router";
import { Logger } from "./app/services/logger.service";
import cashiersRouter from "./app/routers/cashiers.router";
import saleRouter from "./app/routers/sale.router";
import swaggerUi from "swagger-ui-express";
import employeeRouter from "./app/routers/employee.router";
import clientRouter from "./app/routers/clients.router";
import docs from "./app/docs";
dotenv.config();

export class App {
  public server: express.Application;

  constructor() {
    this.server = express();
    this.swagger();
    this.middleware();
    this.router();
    this.connectDB();
  }

  private middleware() {
    Logger.infoLog("Loading Middleware");
    this.server.use(express.json());
    this.server.use(cors());
  }

  private connectDB() {
    Logger.infoLog("Loading Database");
    // Connect to database
    connection()
  }

  private router() {
    Logger.infoLog("Loading Router");
    this.server.use("/v2/auth", authRouter);
    this.server.use("/v2/products", productsRouter);
    this.server.use("/v2/dashboard", dashboardRouter);
    this.server.use("/v2/patrimony", patrimonyRouter);
    this.server.use("/v2/cashiers", cashiersRouter);
    this.server.use("/v2/sales", saleRouter);
    this.server.use("/v2/employee", employeeRouter);
    this.server.use("/v2/clients", clientRouter);
  }

  private swagger() {
    Logger.infoLog("Loading Swagger");
    this.server.use("/v2/api-docs", swaggerUi.serve, swaggerUi.setup(docs));
  }
}

import { Router } from "express";
import { authenticateToken } from "../utils/verifytoken";
import { EmployeeController } from "../controllers/employee.controller";

const employeeRouter = Router();

employeeRouter.get("/", authenticateToken, EmployeeController.getEmployees);
employeeRouter.post("/", authenticateToken, EmployeeController.createEmployee);
employeeRouter.get("/:id", authenticateToken, EmployeeController.getEmployeeById);
employeeRouter.put("/:id", authenticateToken, EmployeeController.updateEmployee);
employeeRouter.delete("/:id", authenticateToken, EmployeeController.deleteEmployee);

export default employeeRouter;
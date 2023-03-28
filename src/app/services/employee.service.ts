import { Logger } from "./logger.service";
import EmployeeModel from "../models/employeeSchema.model";
import { OperationsDB } from "./../db/operations.service";
import UserModel from "../models/userSchema.models";

export class EmployeeService {
  public static async getEmployees(userId: string) {
    const employees = await OperationsDB.getById(
      userId,
      EmployeeModel,
      "Employee"
    );

    Logger.infoLog(`Get employees of user id: ${userId}`);
    if (!employees) {
      Logger.errorLog(`Employees not found`);
      return Promise.reject(`Employees not found`);
    }

    Logger.infoLog(`Employees found`);
    return Promise.resolve(employees);
  }

    public static async getEmployeeById(employeeId: string) {
        const employee = await OperationsDB.getById(employeeId, EmployeeModel);

        Logger.infoLog(`Get employee by id: ${employeeId}`);
        if (!employee) {
            Logger.errorLog(`Employee not found`);
            return Promise.reject(`Employee not found`);
        }

        Logger.infoLog(`Employee found`);
        return Promise.resolve(employee);
    }

    public static async createEmployee(employee: any, userId: string) {
        try {
            Logger.infoLog(`Creating employee`);
            await OperationsDB.registerItem(employee, EmployeeModel)
                .then((employee) => {
                    OperationsDB.addIdToRelatedCollection(userId, employee._id, "employees", UserModel);

                    Logger.infoLog(`Employee created`);
                    return Promise.resolve(employee);
                })
                .catch((error: any) => {
                    Logger.errorLog(error.message);
                    return Promise.reject(error.message);
                });
        } catch (error: any) {
            Logger.errorLog(error.message);
            return Promise.reject(error.message);
        }
    }

    public static async updateEmployee(employeeId: string, employee: any) {
        try {
            Logger.infoLog(`Updating employee`);
            await OperationsDB.updateItems(employeeId, employee, EmployeeModel)
                .then((employee) => {
                    Logger.infoLog(`Employee updated`);
                    return Promise.resolve(employee);
                })
                .catch((error: any) => {
                    Logger.errorLog(error.message);
                    return Promise.reject(error.message);
                });
        } catch (error: any) {
            Logger.errorLog(error.message);
            return Promise.reject(error.message);
        }
    }

    public static async deleteEmployee(employeeId: string) {
        try {
            Logger.infoLog(`Deleting employee`);
            await OperationsDB.deleteItems(employeeId, EmployeeModel)
                .then(() => {
                    Logger.infoLog(`Employee deleted`);
                    return Promise.resolve();
                })
                .catch((error: any) => {
                    Logger.errorLog(error.message);
                    return Promise.reject(error.message);
                });
        } catch (error: any) {
            Logger.errorLog(error.message);
            return Promise.reject(error.message);
        }
    }
}

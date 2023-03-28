import { Request, Response } from 'express';
import { EmployeeService } from '../services/employee.service';
import { successResponse, internalServerErrorResponse, createdResponse } from '../utils/responses.utils';


export class EmployeeController {
    public static async getEmployees(req: Request, res: Response) {
        try {
            const employees = await EmployeeService.getEmployees(req.body.user._id);

            return successResponse(res, employees);

        } catch (error: any) {
            return internalServerErrorResponse(res, error.message);
        }
    }

    public static async getEmployeeById(req: Request, res: Response) {
        try {
            const employee = await EmployeeService.getEmployeeById(req.params.id);

            return successResponse(res, employee);

        } catch (error: any) {
            return internalServerErrorResponse(res, error.message);
        }
    }

    public static async createEmployee(req: Request, res: Response) {
        const { name, cpf, email, password, role } = req.body;

        try {
            const employee = await EmployeeService.createEmployee({ name, cpf, email, password, role, isTemporary: true }, req.body.user._id);

            return createdResponse(res, employee, 'Funcionário');

        } catch (error: any) {
            return internalServerErrorResponse(res, error.message);
        }
    }

    public static async updateEmployee(req: Request, res: Response) {
        try {
            const employee = await EmployeeService.updateEmployee(req.params.id, req.body);

            return successResponse(res, employee);

        } catch (error: any) {
            return internalServerErrorResponse(res, error.message);
        }
    }

    public static async deleteEmployee(req: Request, res: Response) {
        try {
            await EmployeeService.deleteEmployee(req.params.id);

            return successResponse(res, 'Funcionário deletado com sucesso!');

        } catch (error: any) {
            return internalServerErrorResponse(res, error.message);
        }
    }
}
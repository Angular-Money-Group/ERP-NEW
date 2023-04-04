import { Router } from 'express';
import { DashboardController } from '../controllers/dashboard.controller';
import { authenticateToken } from '../utils/verifytoken';

const dashboardRouter = Router();

dashboardRouter.get('/', authenticateToken, DashboardController.getDashboard);

export default dashboardRouter;

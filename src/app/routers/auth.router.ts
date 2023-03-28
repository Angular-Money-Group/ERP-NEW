import { Router } from 'express';
import { login, refreshToken, register, logout } from '../controllers/auth.controller';
import cors from 'cors';

const authRouter = Router();

authRouter.get('/logout', cors(), logout);
authRouter.post('/login', cors(),login);
authRouter.post('/register', cors(),register);
authRouter.post('/refresh-token', cors(), refreshToken);

export default authRouter;
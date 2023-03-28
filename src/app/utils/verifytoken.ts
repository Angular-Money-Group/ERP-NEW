import { unauthorizedResponse, forbiddenResponse, invalidOurExpiredTokenResponse } from './responses.utils';
import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { Logger } from "../services/logger.service";

export const authenticateToken = (req: Request, res: Response, next: NextFunction) => {
    const authHeader = req.headers.authorization;
    const token = authHeader && authHeader.split(" ")[1];
    
    if (!token) {
      return unauthorizedResponse(res);
    }

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET!, (err: any, payload: any) => {
      if (err) {
        return invalidOurExpiredTokenResponse(res)
      }

      Logger.infoLog(`User ${payload.payload.name} authenticated`);
      req.body.user = payload.payload;
      next();
    });
  };

  export const verifyPermission = (req: Request, res: Response, next: NextFunction) => {
    const { role } = req.body.user;
    if (role !== "admin") {
      return forbiddenResponse(res)
    }
    next();
  };

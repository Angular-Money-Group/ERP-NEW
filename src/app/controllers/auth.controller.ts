import { Cashier } from './../models/cashiersSchema.model';
import { successResponse, badRequestResponse, unprocessableEntityResponse } from './../utils/responses.utils';
import { Request, Response } from "express";
import { generateTokens } from "../utils/autenticateToken.utils";
import userSchema from "../models/userSchema.models";
import EmployeeModel from "../models/employeeSchema.model";
import CashiersModel from './../models/cashiersSchema.model';
import bcrypt from "bcrypt";
import { internalServerErrorResponse } from "../utils/responses.utils";
import { cashierMock } from '../mocks/createCashier.mock';

export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return unprocessableEntityResponse(res);
    }

    const user = await userSchema.findOne({ email: email }).select('+password')

    if (!user) {
      return badRequestResponse(res);
    }

    let authenticatedUser: any;

    if (user) {
      authenticatedUser = user;
    }

    const isMatch = await comparePassword(password, authenticatedUser.password);

    if (!isMatch) {
      return badRequestResponse(res);
    }

    delete authenticatedUser.password;

    const { accessToken, refreshToken } = generateTokens(authenticatedUser);

    // setRefreshTokenCookie(res, refreshToken);

    return successResponse(res, { accessToken });
  } catch (error: any) {
    return internalServerErrorResponse(res, error.message);
  }
};

async function comparePassword(candidatePassword: string, hashedPassword: string): Promise<boolean> {
  return bcrypt.compare(candidatePassword, hashedPassword);
}

function setRefreshTokenCookie(res: Response, refreshToken: string) {
  res.cookie("refreshToken", refreshToken, {
    httpOnly: true,
    secure: true,
    sameSite: "none",
    maxAge: 7 * 24 * 60 * 60 * 1000,
  });
}

export const register = async (req: Request, res: Response) => {
  const { name, email, password, cpfCnpj, role } = req.body;

  try {
    if (!name || !email || !password || !cpfCnpj || !role) {
      return unprocessableEntityResponse(res);
    }

    const checkUser = await userSchema.findOne({ email: email });

    if (checkUser) {
      return badRequestResponse(res);
    }

    const salt = await bcrypt.genSalt(16);
    const hashPassword = await bcrypt.hash(password, salt);

    const session = await userSchema.startSession();

    session.startTransaction();

    try {
      const newUser = new userSchema({
        name,
        email,
        password: hashPassword,
        cpfCnpj,
        role,
      });

      const user = await newUser.save();

      await Promise.all(
        cashierMock.map(async (cashier) => {
          cashier.user = user._id;
          await new CashiersModel(cashier).save();
        })
      );

      await session.commitTransaction();
      session.endSession();

      return successResponse(res, user);
    } catch (error: any) {
      await session.abortTransaction();
      session.endSession();
      console.error(error);
      return internalServerErrorResponse(res, error.message);
    }
  } catch (error: any) {
    return internalServerErrorResponse(res, error.message);
  }
};

export const logout = async (req: Request, res: Response) => {
  try {
    res.clearCookie("refreshToken");
    return successResponse(res, {});
  } catch (error: any) {
    return internalServerErrorResponse(res, error.message)
  }
};

export const refreshToken = async (req: Request, res: Response) => {
  try {
    const { refreshToken } = req.cookies;

    if (!refreshToken) {
      return unprocessableEntityResponse(res);
    }

    const { accessToken, refreshToken: newRefreshToken } =
      generateTokens(refreshToken);

    res.cookie("refreshToken", newRefreshToken, {
      httpOnly: true,
      secure: true,
      sameSite: "none",
      maxAge: 7 * 24 * 60 * 60 * 1000, // tempo de vida de 7 dias
    });

    return successResponse(res, { accessToken });
  } catch (error: any) {
    return internalServerErrorResponse(res, error.message)
  }
};

export default { login, refreshToken, logout, register };

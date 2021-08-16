import { NextFunction, Request, Response } from "express"
import { User } from "../interfaces/user.interface";
import UserService from "../services/user.service";
import * as uuid from 'uuid';
import { CustomRequest } from "../interfaces/common.interface";

const userService = new UserService();


export const authorizeMiddleware = async (expressRequest: Request, res: Response, next: NextFunction) => {
  const req = expressRequest as CustomRequest;
  const headers = req.headers;
  const authorization:string = headers.authorization || '';
  if (authorization) {
    const authInfo = await userService.verifyToken(authorization);
    if (!authInfo) return res.status(403).send({message: "Unauthorized"})
    req.auth = authInfo
  }
  next()
}

export const defaultRequest = async (expressRequest: Request, res: Response, next: NextFunction) => {
  const req = expressRequest as CustomRequest;
  const headers = req.headers;
  req.requestId = headers['request-id']?.toString() || uuid.v4();
  next()
}
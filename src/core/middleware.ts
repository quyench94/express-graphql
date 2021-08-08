import { NextFunction, Request, Response } from "express"
import { User } from "../interfaces/user.interface";
import UserService from "../services/user.service";

const userService = new UserService();
interface CustomRequest extends Request {
  auth: User | boolean
}

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
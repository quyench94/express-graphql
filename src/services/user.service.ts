import DataLoader from "dataloader";
import { UniqueConstraintError, Op } from "sequelize";
import { UserRegister, UserLogin, User } from "../interfaces/user.interface";
import UserModel from "../models/user.model";
import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';
import config from "../config/env/config";
import bootstrap from "../core/bootstrap";
import BaseService from "./base.services";
const { resolver } = require("graphql-sequelize");

class UserService extends BaseService {
  _salt = 10;
  _jwtSecret = config.jwtSecret;
  dataLoader: DataLoader<string, UserModel>
  constructor(
  ) {
    super();
    
  }

  async dataloader(keys: string[]) {
    this.dataLoader = new DataLoader((keys) => {
      return UserModel.findAll({
        where: {
          id: {
            [Op.in]: keys
          }
        }
      })
    })
  }

  async getUser({id, isPublisher}: any, options?: any) {
    const where:any = {
      id
    };
    if (isPublisher != undefined) {
      where.isPublisher = true
    }
    return await UserModel.findOne({
      where: where,
    })
  }

  async listUser(params: any, options?: any) {
    const where:any = {};
    if (params.isPublisher != undefined) {
      where.isPublisher = params.isPublisher
    }
    const result = await UserModel.findAndCountAll({
      where: where,
      limit: params.limit,
      offset: this._offset(params.page, params.limit)
    })
    return {
      items: result.rows,
      pagination: this._pagination(params.page, params.limit, result.count)
    }
  }

  async register(paramRegister: UserModel) {
    paramRegister.password = await bcrypt.hash(paramRegister.password, this._salt);
    const user = await UserModel.create(paramRegister)
      .catch(e => {
        if (String(e.name).startsWith('SequelizeUniqueConstraintError')) {
          throw new Error('Email already exists')
        }
        throw new Error('SYSTEM');
      })
    return user;
  }

  async login({ email, password }: UserLogin) {
    const user = await UserModel.findOne({
      where: {
        email: email
      },
    });
    if (!user) throw new Error('Email does not exists')
    const { password: userPassword = '' } = user.previous();
    const isPasswordMatch = await bcrypt.compare(password, userPassword);
    if (!isPasswordMatch) throw new Error('Invalid email or password')
    user.jwtToken = jwt.sign({ id: user.id, email }, this._jwtSecret, { expiresIn: "3h"});
    return user;
  }


  async verifyToken(token: string): Promise<boolean | User> {
    let payload: any
    try {
      payload = jwt.verify(token, this._jwtSecret)
    } catch (error) {
      return false;
    } 
    const { id: userId } = payload;
    const user: User | null = await this.getUser({id: userId});
    if (!user) return false;
    return user
  }
}

export default UserService;
import express from 'express'
import { ApolloServer } from 'apollo-server-express';
import CoreBase from "./base";
import Database from "./database";
import config from "../config/env/config";
import schemas from '../graphql'
import { routers } from '../config/routers';
import * as middleware from './middleware';
import NewsService from '../services/news.service';
import CategoryService from '../services/category.service';
import UserService from '../services/user.service';
import { App, CustomRequest } from '../interfaces/common.interface';

class Bootstrap extends CoreBase {
  database: Database
  constructor(
  ) {
    super();
  }

  public initDatabase() {
    this.database = new Database(config.mysql);
    return this;
  }
  
  public initRouters(app: App) {
    const self = this;
    for (const pathPrefix in routers) {
      if (Object.prototype.hasOwnProperty.call(routers, pathPrefix)) {
        
        const router: express.Router = routers[pathPrefix];
        app.use(pathPrefix, router)
      }
    }
  }

  public initCORS(app: App) {
    app.use((req, res, next) => {
      res.header("Access-Control-Allow-Origin", "*");
      res.header("Access-Control-Expose-Headers", "x-total-count");
      res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE,PATCH");
      res.header("Access-Control-Allow-Headers", "Content-Type,authorization");
      next();
    });
  }

  public initErrorHandler(app: App) {
    app.use((err:any, req:any, res:any,  next:any) => {
      if (String(err.name).startsWith('Sequelize')) {
        res.status(500).json({
          message: 'SYSTEM_ERROR'
        });
      }
    })
  }

  public initGraphQL(app: App) {
    const dataLoaders = () => {
      const newsService = new NewsService()
      const categoryService = new CategoryService()
      const userService = new UserService()
      return {
        newsLoaders: newsService.getDataloader(),
        userLoaders: userService.getDataloader(),
        categoryLoaders: categoryService.getDataloader(),
      };
    };
    const server = new ApolloServer({
      schema: schemas,
      context: async ({req}: {req: express.Request}) => {
        const request = req as CustomRequest || {};
        const loaders = dataLoaders()
        request.loaders = loaders;
        return request;
      },
    });
    server.start().then(() => {
      server.applyMiddleware({ app });
    })
    app.graphqlServer = server;
  }

  public initMiddleware(app: App) {
    app.use(middleware.defaultRequest)
    app.use(middleware.authorizeMiddleware)
  }

}
export default new Bootstrap();
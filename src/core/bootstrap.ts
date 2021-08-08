import express from 'express'
import { graphqlHTTP } from 'express-graphql';

import CoreBase from "./base";
import Database from "./database";
import config from "../config/env/config";
import schemas from '../graphql'
import { routers } from '../config/routers';
import * as middleware from './middleware';

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
  
  public initRouters(app: express.Express) {
    const self = this;
    for (const pathPrefix in routers) {
      if (Object.prototype.hasOwnProperty.call(routers, pathPrefix)) {
        
        const router: express.Router = routers[pathPrefix];
        app.use(pathPrefix, router)
      }
    }
  }

  public initCORS(app: express.Express) {
    app.use((req, res, next) => {
      res.header("Access-Control-Allow-Origin", "*");
      res.header("Access-Control-Expose-Headers", "x-total-count");
      res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE,PATCH");
      res.header("Access-Control-Allow-Headers", "Content-Type,authorization");
      next();
    });
  }

  public initErrorHandler(app: express.Express) {
    app.use((err:any, req:any, res:any,  next:any) => {
      if (String(err.name).startsWith('Sequelize')) {
        res.status(500).json({
          message: 'SYSTEM_ERROR'
        });
      }
    })
  }
  public initGraphQL(app: express.Express) {
    app.use('/graphql', graphqlHTTP({
      schema: schemas,
      rootValue: {},
      graphiql: true,
    }));
  }

  public initMiddleware(app: express.Express) {
    app.use(middleware.authorizeMiddleware)
  }
}
export default new Bootstrap();
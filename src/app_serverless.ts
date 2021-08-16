require('dotenv').config();
import express from 'express';
import bodyParser from 'body-parser';
import bootstrap from './core/bootstrap';
import background from './background_tasks/background';
import { App } from './interfaces/common.interface';

var app = express() as App;
app.use(bodyParser.json())

bootstrap.initDatabase();
bootstrap.initMiddleware(app);
bootstrap.initRouters(app);
bootstrap.initCORS(app);
bootstrap.initErrorHandler(app);
const server = bootstrap.initApolloLambda(app);
background.start();

export const handler = server.createHandler();
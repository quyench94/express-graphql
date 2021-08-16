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
bootstrap.initGraphQL(app);


 
background.start();

app.listen(4000)

export const handler = require('serverless-http')(app)
export default app;
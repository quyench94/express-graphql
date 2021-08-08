require('dotenv').config();
import express from 'express';
import bodyParser from 'body-parser';
import bootstrap from './core/bootstrap';


var app = express()
app.use(bodyParser.json())

bootstrap.initDatabase();
bootstrap.initMiddleware(app);
bootstrap.initRouters(app);
bootstrap.initCORS(app);
bootstrap.initErrorHandler(app);
bootstrap.initGraphQL(app);

// app.listen(4000)
export const handler = require('serverless-http')(app)

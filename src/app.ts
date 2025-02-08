import express, { Express } from 'express';
import dotenv from 'dotenv';
import connectToDataBase from './DBConnection';
import configMiddlewares from './middlewares/config.middleware';
import { Routes } from './routes/all.routes';

const app: Express = express();
dotenv.config();
connectToDataBase();

configMiddlewares.forEach((middlewares) => app.use(middlewares));

app.use('/api', Routes);

export default app;

import express, { Express } from 'express';
import connectToDataBase from './DBConnection';
import configMiddlewares from './middlewares/config.middleware';
import { Routes } from './routes/all.routes';

const app: Express = express();

connectToDataBase();

configMiddlewares.forEach((middlewares) => app.use(middlewares));

app.use('/api', Routes);

export default app;

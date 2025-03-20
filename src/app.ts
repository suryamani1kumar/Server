import express, { Express } from 'express';
// import connectToDataBase from './DBConnection';
import configMiddlewares from './middlewares/config.middleware';
import { Routes } from './routes/all.routes';
import path from 'path';

const app: Express = express();

// connectToDataBase();
app.use('/uploads', express.static(path.join(process.cwd(), 'uploads')));

configMiddlewares.forEach((middlewares) => app.use(middlewares));

app.use('/api', Routes);

export default app;

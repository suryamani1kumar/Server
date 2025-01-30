import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';
import connectToDataBase from './DBConnection';
import userRoutes from './routes/user.routes';
import configMiddlewares from './middlewares/config.middleware';

const app: Express = express();
dotenv.config();
connectToDataBase();

configMiddlewares.forEach((middlewares) => app.use(middlewares));

app.use('/', (req: Request, res: Response) => {
  res.send(`<h1>Triploom Server</h1>`);
});
app.use('/api', userRoutes);
export default app;

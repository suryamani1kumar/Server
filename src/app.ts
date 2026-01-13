import express, { Express } from "express";
import { Request, Response } from 'express';
import connectToDataBase from "./DBConnection";
import configMiddlewares from "./middlewares/config.middleware";
import { protectedRoutes, publicRoutes } from "./routes/all.routes";
import { getImage } from "./controllers/image/image.controller";

const app: Express = express();

connectToDataBase();

app.use("/image/:filename", getImage);

// public Routes
// app.use("/api", publicRoutes);

configMiddlewares.forEach((middlewares) => app.use(middlewares));

// private Routes
app.use("/api", protectedRoutes);
app.use("/", async (req: Request, res: Response) => {
  try {
    res.status(200).send(`<h1>Hello World </h1>`)
  } catch (error) {
    res.status(500).json({ message: 'Internal server error', error });
  }
});


export default app;

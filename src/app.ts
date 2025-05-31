import express, { Express } from "express";
import connectToDataBase from "./DBConnection";
import configMiddlewares from "./middlewares/config.middleware";
import { Routes } from "./routes/all.routes";
import { getImage } from "./controllers/image/image.controller";

const app: Express = express();

connectToDataBase();
app.use("/image/:filename", getImage);

configMiddlewares.forEach((middlewares) => app.use(middlewares));

app.use("/api", Routes);

export default app;

import express, { Express } from "express";
import connectToDataBase from "./DBConnection";
import configMiddlewares from "./middlewares/config.middleware";
import { protectedRoutes, publicRoutes } from "./routes/all.routes";
import { getImage } from "./controllers/image/image.controller";
import defaultUser from "./config/defaultUser";

const app: Express = express();

connectToDataBase().then(() => defaultUser());

app.use("/image/:filename", getImage);

// public Routes
// app.use("/api", publicRoutes);

configMiddlewares.forEach((middlewares) => app.use(middlewares));

// private Routes
app.use("/api", protectedRoutes);

export default app;

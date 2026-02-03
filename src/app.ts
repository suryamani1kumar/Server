import express, { Express } from "express";
import connectToDataBase from "./DBConnection";
import { middlewares } from "./middlewares/config.middleware";
import { protectedRoutes } from "./routes/all.routes";
import defaultUser from "./config/defaultUser";

const app: Express = express();

connectToDataBase().then(() => defaultUser())

middlewares.forEach((middleware) => app.use(middleware));

app.use("/api", protectedRoutes);

export default app;

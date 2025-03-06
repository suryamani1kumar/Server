import express, { Express } from 'express';
// import connectToDataBase from './DBConnection';
import configMiddlewares from './middlewares/config.middleware';
import { Routes } from './routes/all.routes';

const app: Express = express();

// connectToDataBase();

configMiddlewares.forEach((middlewares) => app.use(middlewares));
// app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// // File upload route
// app.post("/upload", upload.array("files", 5), (req: Request, res: Response) => {
//   if (!req.files) {
//     return res.status(400).json({ message: "No files uploaded!" });
//   }

//   res.status(200).json({
//     message: "Files uploaded successfully!",
//     files: req.files,
//   });
// });
app.use('/api', Routes);

export default app;

import express, { Express, Request, Response } from 'express';
// import connectToDataBase from './DBConnection';
import configMiddlewares from './middlewares/config.middleware';
import { Routes } from './routes/all.routes';
import path from 'path';
import upload from './middlewares/upload';

const app: Express = express();

// connectToDataBase();

configMiddlewares.forEach((middlewares) => app.use(middlewares));
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// File upload route
app.post(
  '/api/upload',
  upload.array('files', 5),
  (req: Request, res: Response): void => {
    console.log(req.files);
    if (!req.files) {
      res.status(400).json({ message: 'No files uploaded!' });
    }

    res.status(200).json({
      message: 'Files uploaded successfully!',
      files: req.files,
    });
  }
);
app.use('/api', Routes);

export default app;

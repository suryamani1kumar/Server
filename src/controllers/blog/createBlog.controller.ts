import { Request, Response } from 'express';
import saveJsonToFile from '../../services/saveJson';

export const createBlog = (req: Request, res: Response) => {
  saveJsonToFile('blogData.json', req.body);
  res.send('Data add successfully');
};

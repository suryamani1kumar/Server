import { Request, Response } from 'express';
import saveJsonToFile from '../../services/saveJson';
import usersData from '../../data/usersData.json';

export const CreateUser = (req: Request, res: Response) => {
  const findUser = usersData.find(
    (user) =>
      user.email.trim().toLowerCase() === req.body.email.trim().toLowerCase()
  );
  if (findUser) {
    res.send('User is allready exist');
    return;
  }
  saveJsonToFile('usersData.json', req.body);

  res.send('ok');
};

import { Request, Response } from 'express';
import usersData from '../../data/usersData.json';

export const userLogin = (req: Request, res: Response) => {
  const findUser = usersData.find(
    (user) =>
      user.email.trim().toLowerCase() === req.body.email.trim().toLowerCase()
  );
  if (!findUser) {
    res.send('User is not exist');
    return;
  }
  console.log('findUser', findUser);
  res.send('ok');
};

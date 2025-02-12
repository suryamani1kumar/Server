import { Request, Response } from 'express';
import saveJsonToFile from '../../services/saveJson';
import usersData from '../../data/usersData.json';
import { hashPassword } from '../../services/password';
import { Usertype } from '../../services/type';

const UsersData = usersData as Usertype[];

export const CreateUser = async (req: Request, res: Response) => {
  const RequestData = req.body;
  const findUser = UsersData.find(
    (user) =>
      user.email.trim().toLowerCase() === req.body.email.trim().toLowerCase()
  );
  if (findUser) {
    res.status(302).json({ message: 'User exists, please log in' });
    return;
  }
  const hashedPassword = await hashPassword(RequestData.password);
  const baseUsername = RequestData.email.split('@')[0].replace(/\s+/g, '');
  const randomNum = Math.floor(1000 + Math.random() * 9000);
  RequestData.password = hashedPassword;
  RequestData.username = `${baseUsername}${randomNum}`;
  RequestData.isActive = true;
  RequestData.Lastlogin = '';
  saveJsonToFile('usersData.json', req.body);
  res.status(200).json({ message: 'User registered ', user: findUser });
};

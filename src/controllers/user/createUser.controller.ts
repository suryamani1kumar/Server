import { Request, Response } from "express";
import { hashPassword } from "../../services/password";
import { User } from "../../models/user.schema";

export const CreateUser = async (req: Request, res: Response) => {
  const RequestData = req.body;
  // find user before create user
  const findUser = await User.findOne({
    email: req.body.email.trim().toLowerCase(),
  });

  if (findUser) {
    res.status(302).json({ message: "User exists, please log in" });
    return;
  }
  // password hash
  const hashedPassword = await hashPassword(RequestData.password);

  RequestData.password = hashedPassword;

  // create user
  const userData = await new User(RequestData);
  await userData.save();

  res.status(200).json({ message: "User registered ", user: userData });
};

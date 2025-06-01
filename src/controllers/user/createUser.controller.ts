import { Request, Response } from "express";
import { hashPassword } from "../../services/password";
import { User } from "../../models/user.schema";
import { v4 as uuid } from 'uuid';

export const CreateUser = async (req: Request, res: Response) => {
  try {
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
    const userid = uuid()

    // create user
    const userData = await new User({ ...RequestData, userid });
    await userData.save();

    res.status(200).json({ message: "User registered ", user: userData });
  } catch (error) {
    res.status(500).json({ message: 'Internal server error', error });
  }
};

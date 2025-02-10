import { Request, Response } from "express";
import usersData from "../../data/usersData.json";
import { comparePassword } from "../../services/password";

export const userLogin = async (req: Request, res: Response) => {
  const { password, userIdOrmail } = req.body;
  const findUser = usersData.find(
    (user) =>
      user.email.trim().toLowerCase() === userIdOrmail.trim().toLowerCase() ||
      user.username.trim().toLowerCase() === userIdOrmail.trim().toLowerCase()
  );

  if (!findUser) {
    res.send("User is not exist");
    return;
  }
  const checkPassword = await comparePassword(password, findUser.password);
  if (!checkPassword) {
    res.send("Password is not match");
    return;
  }

  res.send("ok");
};

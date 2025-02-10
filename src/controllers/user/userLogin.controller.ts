import { Request, Response } from "express";
import usersData from "../../data/usersData.json";
import { comparePassword } from "../../services/password";
import {
  generateAccessToken,
  generateRefreshToken,
} from "../../services/token";

export const userLogin = async (req: Request, res: Response) => {
  const { password, userIdOrmail } = req.body;
  const findUser = usersData.find(
    (user) =>
      user.email.trim().toLowerCase() === userIdOrmail.trim().toLowerCase() ||
      user.username.trim().toLowerCase() === userIdOrmail.trim().toLowerCase()
  );

  if (!findUser){  
    res.status(404).json({ message: "user does not exist" });
    return
                }
  const checkPassword = await comparePassword(password, findUser.password);
  if (!checkPassword){
     res.status(400).json({ message: "Invalid credentials" });return
  }
  const accessToken = generateAccessToken(req.body);
  const refreshToken = generateRefreshToken(req.body);
  res.cookie("accessToken", accessToken, {
    httpOnly: true,
    secure: true,
    sameSite: "strict",
  });

  res.cookie("refreshToken", refreshToken, {
    httpOnly: true,
    secure: true,
    sameSite: "strict",
  });
  res.status(200).json({ message: "Login successful!" });
};

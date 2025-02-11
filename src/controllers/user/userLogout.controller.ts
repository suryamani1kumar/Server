import { Request, Response } from "express";

export const logout = (req: Request, res: Response) => {
  res.clearCookie("a_token");
  res.clearCookie("r_token");
  res.status(200).json({ message: "logout" });
};

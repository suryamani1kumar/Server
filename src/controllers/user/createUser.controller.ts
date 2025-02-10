import { Request, Response } from "express";
import saveJsonToFile from "../../services/saveJson";
import usersData from "../../data/usersData.json";
import { v4 as uuid } from "uuid";
import { hashPassword } from "../../services/password";

export const CreateUser = async (req: Request, res: Response) => {
  const RequestData = req.body;
  const findUser =
    usersData.length > 0 &&
    usersData.find(
      (user) =>
        user.email.trim().toLowerCase() === req.body.email.trim().toLowerCase()
    );
  if (findUser) {
    res.send("User is allready exist");
    return;
  }
  const hashedPassword = await hashPassword(RequestData.password);
  const baseUsername = RequestData.email.split("@")[0].replace(/\s+/g, "");
  const randomNum = Math.floor(1000 + Math.random() * 9000);
  RequestData.password = hashedPassword;
  RequestData.username = `${baseUsername}${randomNum}`;
  RequestData.id = uuid();
  RequestData.isActive = true;
  RequestData.createdAt = new Date().toISOString();
  RequestData.updatedAt = RequestData.createdAt;
  saveJsonToFile("usersData.json", req.body);
  res.send("ok");
};

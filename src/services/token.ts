import jwt from "jsonwebtoken";
import { config } from "../config/config";
export const generateAccessToken = (user: any) => {
  return jwt.sign(user, config.ACCESS_TOKEN_SECRET, {
    expiresIn: "1d",
  });
};

export const generateRefreshToken = (user: any) => {
  return jwt.sign(user, config.REFRESH_TOKEN_SECRET, {
    expiresIn: "2d",
  }); // Long lifespan
};

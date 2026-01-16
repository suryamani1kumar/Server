import jwt, { SignOptions } from "jsonwebtoken";
import { config } from "../config/config";

/**
 * JWT payload shape
 */
export interface IJwtPayload {
  userId: string;
  role?: "admin" | "superadmin" | "editor" | "viewer";
}

/**
 * Generate Access Token
 */
export const generateAccessToken = (payload: IJwtPayload): string => {
  const options: SignOptions = {
    expiresIn: "2d",
  };

  return jwt.sign(payload, config.ACCESS_TOKEN_SECRET as string, options);
};

/**
 * Generate Refresh Token
 */
export const generateRefreshToken = (
  payload: Pick<IJwtPayload, "userId">
): string => {
  const options: SignOptions = {
    expiresIn: "4d",
  };

  return jwt.sign(payload, config.REFRESH_TOKEN_SECRET as string, options);
};

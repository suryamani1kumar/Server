import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { config } from "../config/config";

// ✅ Extend Request type to include user info
export interface AuthRequest extends Request {
  user?: {
    userId: string;
    name: string;
    username: string;
    email: string;
    role: string;
  };
}

/**
 * Universal auth middleware for all users
 * - Checks access token first
 * - If expired, checks refresh token
 */
export const authMiddleware = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const accessToken = req.cookies?.accessToken;
    const refreshToken = req.cookies?.refreshToken;

    if (!accessToken && !refreshToken) {
      res.status(401).json({ message: "Not authorized" });
      return; // ✅ stop execution, do NOT return res
    }

    let decoded: AuthRequest["user"];

    try {
      // Try access token first
      decoded = jwt.verify(
        accessToken!,
        config.ACCESS_TOKEN_SECRET as string,
      ) as AuthRequest["user"];

      req.user = decoded;
      next();
      return;
    } catch (err) {
      // If access token invalid or expired, try refresh token
      if (!refreshToken) {
        res.status(401).json({ message: "Not authorized" });
        return;
      }

      decoded = jwt.verify(
        refreshToken,
        config.REFRESH_TOKEN_SECRET as string,
      ) as AuthRequest["user"];

      req.user = decoded;
      next();
      return;
    }
  } catch (error) {
    console.error("Auth error:", error);
    res.status(401).json({ message: "Invalid or expired token" });
    return;
  }
};

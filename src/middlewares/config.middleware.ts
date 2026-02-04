import authenticateApiKey from "./header.Auth";
import cors from "cors";
import express, {
  NextFunction,
  Request,
  RequestHandler,
  Response,
} from "express";
import cookieParser from "cookie-parser";
import { config } from "../config/config";

const corsOptions = {
  origin: config.ORIGIN,
  credentials: true,
};

export const middlewares: RequestHandler[] = [
  cors(corsOptions),
  express.json({ limit: "5mb" }),
  cookieParser(),
  authenticateApiKey,
];

// export const roleMiddleware =
//   (...allowedRoles: string[]) =>
//   (req: Request, res: Response, next: NextFunction) => {
//     console.log(req)
//     if (!req.user) {
//       return res.status(401).json({
//         success: false,
//         message: "Unauthorized",
//       });
//     }

//     if (!allowedRoles.includes(req.user.role)) {
//       return res.status(403).json({
//         success: false,
//         message: "Access denied",
//       });
//     }

//     next();
//   };


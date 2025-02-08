import authenticateApiKey from './header.Auth';
import cors from 'cors';
import express, { NextFunction, RequestHandler } from 'express';
import cookieParser from 'cookie-parser';

// const setCookieMiddleware = (
//   req: Request,
//   res: Response,
//   next: NextFunction
// ) => {
//   // Set a cookie named "sessionId"
//   res.cookie('sessionId', '123456', {
//     httpOnly: true, // Makes the cookie inaccessible to client-side JavaScript
//     secure: true, // Only send cookie over HTTPS in production
//     sameSite: 'strict', // Protects against CSRF attacks
//     maxAge: 24 * 60 * 60 * 1000, // 1 day in milliseconds
//   });

//   // Proceed to the next middleware or route handler
//   next();
// };

const middlewares: RequestHandler[] = [
  cors(),
  express.json(),
  // cookieParser(),
  // setCookieMiddleware,
  authenticateApiKey,
];

export default middlewares;

import authenticateApiKey from './header.Auth';
import cors from 'cors';
import express, { RequestHandler } from 'express';
import cookieParser from 'cookie-parser';
import { config } from '../config/config';

const corsOptions = {
  origin: config.ORIGIN,
  credentials: true,
};

const middlewares: RequestHandler[] = [
  cors(corsOptions),
  express.json(),
  cookieParser(),
  authenticateApiKey,
];

export default middlewares;

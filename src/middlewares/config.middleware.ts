import authenticateApiKey from './header.Auth';
import cors from 'cors';
import express, { RequestHandler } from 'express';
import cookieParser from 'cookie-parser';

const corsOptions = {
  origin: [
    'http://localhost:3000',
    'http://localhost:5173',
    'https://triploomserver.onrender.com',
  ],
  credentials: true,
};

const middlewares: RequestHandler[] = [
  cors(corsOptions),
  express.json(),
  cookieParser(),
  authenticateApiKey,
];

export default middlewares;

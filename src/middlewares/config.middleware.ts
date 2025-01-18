// import authenticateApiKey from './header.Auth';
import cors from 'cors';
import express, { RequestHandler } from 'express';

const middlewares: RequestHandler[] = [
  cors(),
  // authenticateApiKey,
  express.json(),
];

export default middlewares;

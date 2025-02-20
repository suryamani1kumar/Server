import dotenv from 'dotenv';
import path from 'path';

const envFile = `.env.${process.env.NODE_ENV || 'development'}`;

dotenv.config({ path: path.resolve(process.cwd(), envFile) });

const parsedOrigin = process.env.ORIGIN
  ? JSON.parse(process.env.ORIGIN)
  : ['http://localhost:3000', 'http://localhost:5173'];

export const config = {
  PORT: process.env.PORT || 5000,
  API_HEADER_KEY: process.env.API_HEADER_KEY || 'your-valid-api-key',
  DATABASE: {
    DB_NAME: process.env.DB_NAME || 'mongodb://localhost:27017',
  },
  ACCESS_TOKEN_SECRET:
    process.env.ACCESS_TOKEN_SECRET || 'tripLoom_5000_development',
  REFRESH_TOKEN_SECRET:
    process.env.REFRESH_TOKEN_SECRET || 'Triploom#5000#development',
  ORIGIN: parsedOrigin,
};

import dotenv from 'dotenv';
import path from 'path';

const envFile = `.env.${process.env.NODE_ENV || 'development'}`;

dotenv.config({ path: path.resolve(__dirname, envFile) });

export const config = {
  PORT: process.env.PORT || 5000,
  API_HEADER_KEY: process.env.API_HEADER_KEY || 'your-valid-api-key',
  DATABASE: {
    DB_NAME: process.env.DB_NAME || 'mongodb://localhost:27017',
  },
};

import dotenv from "dotenv";
import path from "path";

const envFile = `.env.${process.env.NODE_ENV}`;

dotenv.config({ path: path.resolve(process.cwd(), envFile) });

const parsedOrigin = JSON.parse(process.env.ORIGIN as string);

export const config = {
  PORT: process.env.PORT,
  API_HEADER_KEY: process.env.API_HEADER_KEY,
  DATABASE: {
    DB_NAME: process.env.DB_NAME,
  },
  ACCESS_TOKEN_SECRET: process.env.ACCESS_TOKEN_SECRET as string,
  REFRESH_TOKEN_SECRET: process.env.REFRESH_TOKEN_SECRET as string,
  ORIGIN: parsedOrigin,
  SERVER_URL: process.env.SERVER_URL,
};

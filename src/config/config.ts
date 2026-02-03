import dotenv from "dotenv";

dotenv.config(); // just load the single .env file

// Parse ORIGIN safely (as string[]), default to empty array if missing
const parsedOrigin: string[] = process.env.ORIGIN
  ? JSON.parse(process.env.ORIGIN)
  : [];

// Helper to require environment variables and fail fast if missing
function requireEnv(key: string): string {
  const value = process.env[key];
  if (!value) {
    throw new Error(`Missing environment variable: ${key}`);
  }
  return value;
}

export const config = {
  PORT: Number(requireEnv("PORT")),
  API_HEADER_KEY: requireEnv("API_HEADER_KEY"),

  DATABASE: {
    DB_NAME: requireEnv("DB_NAME"),
  },

  ACCESS_TOKEN_SECRET: requireEnv("ACCESS_TOKEN_SECRET"),
  REFRESH_TOKEN_SECRET: requireEnv("REFRESH_TOKEN_SECRET"),

  CLOUDINARY_CLOUD_NAME: requireEnv("CLOUDINARY_CLOUD_NAME"),
  CLOUDINARY_API_KEY: requireEnv("CLOUDINARY_API_KEY"),
  CLOUDINARY_API_SECRET: requireEnv("CLOUDINARY_API_SECRET"),

  ORIGIN: parsedOrigin,
  SERVER_URL: requireEnv("SERVER_URL"),
} as const;

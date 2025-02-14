import path from "path";
import { format, createLogger, transports } from "winston";

const logFormat = format.printf(({ level, message, timestamp, stack }) => {
  return `${timestamp} ${level}: ${stack || message}`;
});

const logger = createLogger({
  level: "info", // Set log level (error, warn, info, http, verbose, debug, silly)
  format: format.combine(
    format.timestamp(),
    format.errors({ stack: true }),
    format.json(),
    logFormat
  ),

  transports: [
    new transports.File({
      filename: path.join("src", "log", "app.log"),
      level: "error",
    }), // Logs to a file
  ],
});

// Export logger
export default logger;

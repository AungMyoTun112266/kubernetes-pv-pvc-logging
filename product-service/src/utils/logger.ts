import winston from "winston";
import DailyRotateFile from "winston-daily-rotate-file";
import * as path from "path";
import * as fs from "fs";

const logDir = process.env.LOG_DIR || "./logs";

// Ensure log directory exists with correct permissions
try {
  if (!fs.existsSync(logDir)) {
    fs.mkdirSync(logDir, { recursive: true });
    fs.chmodSync(logDir, 0o777); // Ensure writable
  }
} catch (error) {
  console.error(`Failed to create log directory`);
}

const transport = new DailyRotateFile({
  filename: path.join(logDir, "product-%DATE%.log"),
  datePattern: "YYYY-MM-DD",
  zippedArchive: true,
  maxSize: "20m",
  maxFiles: "14d",
  createSymlink: true,
  symlinkName: "product-current.log",
});

transport.on("error", (error) => {
  console.error(`Logging error: ${error.message}`);
});

const logger = winston.createLogger({
  level: "info",
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.json(),
    winston.format.metadata()
  ),
  transports: [transport, new winston.transports.Console()],
});

export function logRequest(method: string, url: string, message: string) {
  logger.info(message, { method, url });
}

export default logger;

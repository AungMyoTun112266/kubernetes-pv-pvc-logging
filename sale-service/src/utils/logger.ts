import winston from "winston";
import DailyRotateFile from "winston-daily-rotate-file";
import * as path from "path";

const logDir = process.env.LOG_DIR || "./logs";

const transport = new DailyRotateFile({
  filename: path.join(logDir, "sale-%DATE%.log"),
  datePattern: "YYYY-MM-DD",
  zippedArchive: true,
  maxSize: "20m",
  maxFiles: "14d",
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

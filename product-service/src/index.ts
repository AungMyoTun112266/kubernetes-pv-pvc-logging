import express, { Request, Response, NextFunction } from "express";
import dotenv from "dotenv";
import productRoutes from "./routes/productRoutes";
import logger, { logRequest } from "./utils/logger";

dotenv.config();

const app = express();
const port = process.env.PORT || 3001;

app.use(express.json());

// Log all requests
app.use((req: Request, res: Response, next: NextFunction) => {
  logRequest(req.method, req.originalUrl, "Incoming request");
  next();
});

app.use("/api", productRoutes);

// Error handling middleware
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  logRequest(req.method, req.originalUrl, `Unhandled error: ${err.message}`);
  res.status(500).json({ error: "Internal server error" });
});

app.listen(port, () => {
  logger.info(`Product Service running on port ${port}`);
});

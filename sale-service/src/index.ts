import express from "express";
import dotenv from "dotenv";
import saleRoutes from "./routes/saleRoutes";
import logger from "./utils/logger";

dotenv.config();

const app = express();
const port = process.env.PORT || 3002;

app.use(express.json());
app.use("/api", saleRoutes);

app.listen(port, () => {
  logger.info(`Sale Service running on port ${port}`);
});

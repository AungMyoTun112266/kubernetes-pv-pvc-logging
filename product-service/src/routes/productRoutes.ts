import { Router } from "express";
import {
  getProducts,
  getProduct,
  createProduct,
} from "../controllers/productController";

const router = Router();

router.get("/products", getProducts);
router.get("/products/:id", getProduct);
router.post("/products", createProduct);

export default router;

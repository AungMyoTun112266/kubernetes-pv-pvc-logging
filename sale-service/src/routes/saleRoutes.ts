import { Router } from "express";
import { getSales, getSale, createSale } from "../controllers/saleController";

const router = Router();

router.get("/sales", getSales);
router.get("/sales/:id", getSale);
router.post("/sales", createSale);

export default router;

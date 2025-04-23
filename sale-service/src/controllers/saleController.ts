import { Request, Response } from "express";
import { SaleService } from "../services/saleService";
import { logRequest } from "../utils/logger";

const saleService = new SaleService();

export async function getSales(req: Request, res: Response) {
  try {
    logRequest(req.method, req.originalUrl, "Fetching sales");
    const sales = await saleService.getSales();
    res.json(sales);
  } catch (error) {
    logRequest(req.method, req.originalUrl, `Error fetching sales: ${error}`);
    res.status(500).json({ error: "Internal server error" });
  }
}

export async function getSale(req: Request, res: Response) {
  try {
    logRequest(
      req.method,
      req.originalUrl,
      `Fetching sale with id: ${req.params.id}`
    );
    const id = parseInt(req.params.id);
    const sale = await saleService.getSale(id);
    res.json(sale);
  } catch (error: any) {
    logRequest(
      req.method,
      req.originalUrl,
      `Error fetching sale: ${error.message}`
    );
    res
      .status(error.message.includes("not found") ? 404 : 500)
      .json({ error: error.message });
  }
}

export async function createSale(req: Request, res: Response) {
  try {
    logRequest(req.method, req.originalUrl, "Creating sale");
    const { productId, quantity } = req.body;
    if (!productId || typeof quantity !== "number") {
      throw new Error("Product ID and quantity are required");
    }
    const sale = await saleService.createSale(productId, quantity);
    res.status(201).json(sale);
  } catch (error: any) {
    logRequest(
      req.method,
      req.originalUrl,
      `Error creating sale: ${error.message}`
    );
    res
      .status(error.message.includes("required") ? 400 : 500)
      .json({ error: error.message });
  }
}

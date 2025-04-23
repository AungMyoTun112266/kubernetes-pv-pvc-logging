import { Request, Response } from "express";
import { ProductService } from "../services/productService";
import { logRequest } from "../utils/logger";

const productService = new ProductService();

export async function getProducts(req: Request, res: Response) {
  try {
    logRequest(req.method, req.originalUrl, "Fetching products");
    const products = await productService.getProducts();
    res.json(products);
  } catch (error) {
    logRequest(
      req.method,
      req.originalUrl,
      `Error fetching products: ${error}`
    );
    res.status(500).json({ error: "Internal server error" });
  }
}

export async function getProduct(req: Request, res: Response) {
  try {
    logRequest(
      req.method,
      req.originalUrl,
      `Fetching product with id: ${req.params.id}`
    );
    const id = parseInt(req.params.id);
    const product = await productService.getProduct(id);
    res.json(product);
  } catch (error: any) {
    logRequest(
      req.method,
      req.originalUrl,
      `Error fetching product: ${error.message}`
    );
    res
      .status(error.message.includes("not found") ? 404 : 500)
      .json({ error: error.message });
  }
}

export async function createProduct(req: Request, res: Response) {
  try {
    logRequest(req.method, req.originalUrl, "Creating product");
    const { name, price } = req.body;
    if (!name || typeof price !== "number") {
      throw new Error("Name and price are required");
    }
    const product = await productService.createProduct(name, price);
    res.status(201).json(product);
  } catch (error: any) {
    logRequest(
      req.method,
      req.originalUrl,
      `Error creating product: ${error.message}`
    );
    res
      .status(error.message.includes("required") ? 400 : 500)
      .json({ error: error.message });
  }
}

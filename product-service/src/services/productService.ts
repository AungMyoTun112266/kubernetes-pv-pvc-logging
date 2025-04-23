import logger from "../utils/logger";

export class ProductService {
  private products: { id: number; name: string; price: number }[] = [
    { id: 1, name: "Laptop", price: 999 },
  ];

  async getProducts() {
    logger.info("Fetching products");
    return this.products;
  }

  async getProduct(id: number) {
    logger.info(`Fetching product with id: ${id}`);
    const product = this.products.find((p) => p.id === id);
    if (!product) throw new Error(`Product with id ${id} not found`);
    return product;
  }

  async createProduct(name: string, price: number) {
    const id = this.products.length + 1;
    const product = { id, name, price };
    this.products.push(product);
    logger.info(`Created product with id: ${id}`);
    return product;
  }
}

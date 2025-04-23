import logger from "../utils/logger";

export class SaleService {
  private sales: {
    id: number;
    productId: number;
    quantity: number;
    total: number;
  }[] = [{ id: 1, productId: 1, quantity: 2, total: 1998 }];

  async getSales() {
    logger.info("Fetching sales");
    return this.sales;
  }

  async getSale(id: number) {
    logger.info(`Fetching sale with id: ${id}`);
    const sale = this.sales.find((s) => s.id === id);
    if (!sale) throw new Error(`Sale with id ${id} not found`);
    return sale;
  }

  async createSale(productId: number, quantity: number) {
    const id = this.sales.length + 1;
    const total = quantity * 999; // Assume product price is 999
    const sale = { id, productId, quantity, total };
    this.sales.push(sale);
    logger.info(`Created sale with id: ${id}`);
    return sale;
  }
}

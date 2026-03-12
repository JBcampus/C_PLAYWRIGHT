import { Page } from "@playwright/test";
import { log } from "../helpers/log.helper";

export class InventoryPage {
  constructor(private page: Page) {}

  async assertInventoryURL() {
    await this.page.waitForURL(/inventory/);
  }

  async sortBy(type: string) {
    log(`Aplicando filtro: ${type}`);
    await this.page.selectOption(".product_sort_container", type);
  }

  async addProducts(indices: number[]) {
    for (const i of indices) {
      log(`Agregando producto índice ${i}`);
      await this.page.locator(".inventory_item").nth(i).locator("button").click();
    }
  }

  async getBadgeCount() {
    return this.page.locator(".shopping_cart_badge").innerText();
  }

  async goToCart() {
    await this.page.click(".shopping_cart_link");
  }
}

import { expect, Page } from '@playwright/test';

/** Encapsula el inventario y el acceso al carrito. */
export class InventoryPage {
  constructor(private readonly page: Page) {}

  /**
   * Agrega los tres productos indicados en la consigna.
   * @remarks Se utilizan los atributos data-test solicitados.
   */
  async addRequiredProducts(): Promise<void> {
    const selectors = [
      '[data-test="add-to-cart-sauce-labs-backpack"]',
      '[data-test="add-to-cart-sauce-labs-fleece-jacket"]',
      '[data-test="add-to-cart-test.allthethings()-t-shirt-(red)"]',
    ];
    for (const selector of selectors) {
      await this.page.locator(selector).click();
    }
  }

  /** Abre el carrito desde el icono de navegación. */
  async openCart(): Promise<void> {
    await this.page.locator('[data-test="shopping-cart-link"]').click();
  }
}

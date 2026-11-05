import { expect, Page } from '@playwright/test';

/** Acciones y validaciones de la página del carrito. */
export class CartPage {
  constructor(private readonly page: Page) {}

  /** Verifica que el carrito contenga la cantidad esperada de productos. */
  async expectItemCount(expected: number): Promise<void> {
    await expect(this.page.locator('[data-test="inventory-item"]')).toHaveCount(expected);
    await expect(this.page.locator('[data-test="checkout"]')).toBeVisible();
  }

  /** Continúa al formulario de checkout. */
  async checkout(): Promise<void> {
    await this.page.locator('[data-test="checkout"]').click();
  }
}

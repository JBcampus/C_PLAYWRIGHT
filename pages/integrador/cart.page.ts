import { Page, expect } from '@playwright/test';

/**
 * Carrito de compras.
 */
export class CartPage {
  constructor(private page: Page) {}

  async assertItems(count: number) {
    const rows = await this.page.locator('tbody tr').count();
    expect(rows).toBe(count);
  }

  async checkout() {
    await this.page.click('.check_out');
  } 

  async logout() {
    const logoutLink = this.page.locator('a[href="/logout"]');

    if (await logoutLink.count() === 0) {
      return; // no está disponible en este flujo
    }

    if (!(await logoutLink.isVisible())) {
      return; // no visible (p.ej. ya no está logueado)
    }

    await logoutLink.click();
  }
}
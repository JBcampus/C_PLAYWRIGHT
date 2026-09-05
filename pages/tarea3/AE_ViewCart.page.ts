import { Locator, Page, expect } from "@playwright/test";

/** Page object de la vista del carrito de compras. */
export class AE_ViewCart_Page {
  private readonly PRODUCT_POLO_1: Locator;
  private readonly BTN_PROCEED_TO_CHECKOUT: Locator;

  /**
   * Crea el page object y prepara los localizadores del carrito.
   *
   * @param page - Instancia de pagina de Playwright.
   */
  constructor(private page: Page) {
    this.PRODUCT_POLO_1 = page.locator('a[href="/product_details/1"]');
    this.BTN_PROCEED_TO_CHECKOUT = page.getByText("Proceed To Checkout");
  }

  /** Verifica que la URL actual corresponda a la vista del carrito. */
  async expectViewCartURL(): Promise<void> {
    await expect(this.page).toHaveURL(/view_cart/);
  }

  /** Verifica que el producto Polo aparezca en el carrito. */
  async expectProductNameVisible(): Promise<void> {
    await expect(this.PRODUCT_POLO_1).toBeVisible();
  }

  /** Avanza desde el carrito hacia el proceso de checkout. */
  async clickProceedToCheckout(): Promise<void> {
    await this.BTN_PROCEED_TO_CHECKOUT.click();
  }
}

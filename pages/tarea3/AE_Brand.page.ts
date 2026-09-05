import { Locator, Page, expect } from "@playwright/test";

/** Page object de la pagina de productos de la marca Polo. */
export class AE_Brand_Page {
  private readonly DIV_CART_MODAL: Locator;
  private readonly LINK_VIEW_CART: Locator;
  private readonly PRODUCT_POLO_1: Locator;

  /**
   * Crea el page object y prepara los localizadores de la pagina.
   *
   * @param page - Instancia de pagina de Playwright.
   */
  constructor(private page: Page) {
    this.DIV_CART_MODAL = page.locator("#cartModal");
    this.LINK_VIEW_CART = page.locator('a[href="/view_cart"]').last();
    this.PRODUCT_POLO_1 = page
      .locator('a[data-product-id="1"].btn.btn-default.add-to-cart:visible')
      .first();
  }

  /** Agrega el primer producto Polo al carrito. */
  async clickAddToCart(): Promise<void> {
    await this.PRODUCT_POLO_1.click();
  }

  /** Verifica que el modal del carrito sea visible. */
  async expectViewCartVisible(): Promise<void> {
    //await expect(this.DIV_CART_MODAL).toBeHidden();
    await expect(this.DIV_CART_MODAL).toBeVisible({ timeout: 5000 });
  }

  /** Abre la vista del carrito mediante el enlace `View Cart`. */
  async clickViewCart(): Promise<void> {
    await this.LINK_VIEW_CART.click();
  }
}

import { Page, expect } from "@playwright/test";

/**
 * @class BrandPage
 * @description Maneja el filtrado de productos por marcas, carrito y checkout.
 */
export class BrandPage {
  readonly page: Page;
  readonly proceedToCheckoutButton = ".btn.btn-default.check_out";
  readonly productNameInCart = ".cart_description h4 a";

  constructor(page: Page) {
    this.page = page;
  }

  /**
   * Valida que la URL contenga la ruta de la marca Polo.
   */
  async validateBrandUrl(): Promise<void> {
    await expect(this.page).toHaveURL(/.*brand_products\/Polo/);
  }

  /**
   * Añade el primer producto al carrito.
   */
  async addFirstProductToCart(): Promise<void> {
    await this.page.locator(".product-image-wrapper").first().hover();
    await this.page
      .locator(".product-image-wrapper .add-to-cart")
      .first()
      .click();
  }

  /**
   * Valida el modal emergente y hace clic en "View Cart".
   */
  async clickViewCartModal(): Promise<void> {
    const viewCartLink = this.page.locator("u", { hasText: "View Cart" });
    await expect(viewCartLink).toBeVisible();
    await viewCartLink.click();
  }

  /**
   * Valida el producto en el carrito y procede al Checkout.
   */
  async proceedToCheckout(): Promise<void> {
    await expect(this.page.locator(this.productNameInCart)).toBeVisible();
    await this.page.click(this.proceedToCheckoutButton);
  }
}

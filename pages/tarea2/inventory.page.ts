import { Page, expect } from "@playwright/test";

/**
 * @class InventoryPage
 * @description Maneja las acciones y validaciones en el catálogo de productos y el carrito.
 */
export class InventoryPage {
  readonly page: Page;
  readonly titleSpan = ".title";
  readonly shoppingCartLink = ".shopping_cart_link";
  readonly shoppingCartBadge = ".shopping_cart_badge";

  constructor(page: Page) {
    this.page = page;
  }

  /**
   * Valida que se encuentre en la URL de inventario y el título secundario sea 'Products'.
   */
  async validateInventoryPage(): Promise<void> {
    await expect(this.page).toHaveURL(/.*inventory\.html/);
    await expect(this.page.locator(this.titleSpan)).toHaveText("Products");
  }

  /**
   * Agrega los 3 productos específicos al carrito usando atributos data-test exactos.
   */
  async addThreeProducts(): Promise<void> {
    // 1. Sauce Labs Backpack
    await this.page.click('[data-test="add-to-cart-sauce-labs-backpack"]');

    // 2. Sauce Labs Fleece Jacket
    await this.page.click('[data-test="add-to-cart-sauce-labs-fleece-jacket"]');

    // 3. Test.allTheThings() T-Shirt (Red) con su data-test exacto
    await this.page.click(
      '[data-test="add-to-cart-test.allthethings\\(\\)-t-shirt-\\(red\\)"]',
    );
  }

  /**
   * Valida el número de elementos en el carrito y navega hacia él.
   * @param expectedCount Cantidad esperada de elementos en el badge
   */
  async goToCart(expectedCount: string): Promise<void> {
    await expect(this.page.locator(this.shoppingCartBadge)).toHaveText(
      expectedCount,
    );
    await this.page.click(this.shoppingCartLink);
  }
}

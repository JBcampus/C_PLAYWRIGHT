import { Page, Locator, expect } from '@playwright/test';

/** Page Object que contiene las acciones del catálogo, marca y carrito. */
export class ShopPage {
  constructor(private readonly page: Page) {}

  private get firstProduct(): Locator { return this.page.locator('.features_items .product-image-wrapper').first(); }
  private get firstProductName(): Locator { return this.firstProduct.locator('.productinfo p'); }

  /** Abre Home y selecciona la marca Polo desde el listado de marcas. */
  async openPoloBrand(): Promise<void> {
    await this.page.goto('https://automationexercise.com/');
    const poloBrand = this.page.locator('.brands-name a').filter({ hasText: /^Polo\b/i }).first();
    if (await poloBrand.count()) {
      await poloBrand.click();
    } else {
      await this.page.locator('a').filter({ hasText: /^Polo\b/i }).first().click();
    }
    await expect(this.page).toHaveURL(/Polo/i);
  }

  /** Guarda el nombre del primer producto y lo agrega al carrito. */
  async addFirstProductToCart(): Promise<string> {
    await expect(this.firstProduct).toBeVisible();
    const productName = (await this.firstProductName.innerText()).trim();
    await this.firstProduct.getByRole('link', { name: /add to cart/i }).first().click();
    return productName;
  }

  /** Abre el carrito desde el diálogo que aparece al agregar el producto. */
  async openCartFromModal(): Promise<void> {
    const viewCart = this.page.getByRole('link', { name: /view cart/i });
    await expect(viewCart).toBeVisible();
    await viewCart.click();
    await expect(this.page).toHaveURL(/view_cart/);
  }

  /** Valida que el producto agregado se encuentre en el carrito. */
  async verifyProductInCart(productName: string): Promise<void> {
    await expect(this.page.locator('#cart_info')).toContainText(productName);
  }

  /** Continúa desde el carrito hacia el proceso de checkout. */
  async proceedToCheckout(): Promise<void> {
    await this.page.getByRole('link', { name: /proceed to checkout/i }).click();
  }
}
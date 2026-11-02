import { type Page, expect } from "@playwright/test";

/**
 * Page Object Model para la sección de productos.
 */
export class ProductsPage {
  constructor(private readonly page: Page) {}

  /**
   * Navega a la página principal.
   */
  async navigate(): Promise<void> {
    await this.page.goto("https://automationexercise.com/");
  }

  /**
   * Selecciona la marca Polo y controla los anuncios intersticiales.
   */
  async selectPoloBrand(): Promise<void> {
    const poloLink = this.page.locator('a[href="/brand_products/Polo"]');

    await expect(poloLink).toBeVisible();

    // Intentar cerrar un anuncio si ya está presente.
    await this.closeGoogleVignetteIfPresent();

    // Seleccionar la marca POLO.
    await poloLink.click();

    // Si aparece el anuncio después del clic, cerrarlo y reintentar.
    if (this.page.url().includes("#google_vignette")) {
      await this.closeGoogleVignetteIfPresent();

      await poloLink.click();
    }
  }

  /**
   * Valida que se haya ingresado a la página de productos Polo.
   */
  async verifyPoloUrl(): Promise<void> {
    await expect(this.page).toHaveURL(/\/brand_products\/Polo\/?$/);
  }

  /**
   * Agrega el primer producto de la lista al carrito.
   *
   * @returns Nombre del producto seleccionado.
   */
  async addFirstProductToCart(): Promise<string> {
    const firstProduct = this.page
      .locator(".features_items .product-image-wrapper")
      .first();

    const productName = (
      await firstProduct.locator(".productinfo p").first().innerText()
    ).trim();

    const addButton = firstProduct
      .locator(".productinfo a.add-to-cart")
      .first();

    await expect(addButton).toBeVisible();

    await addButton.click();

    return productName;
  }

  /**
   * Verifica que View Cart esté visible y accede al carrito.
   */
  async openCart(): Promise<void> {
    const viewCartButton = this.page.getByRole("link", {
      name: "View Cart",
    });

    await expect(viewCartButton).toBeVisible();

    await viewCartButton.click();

    await expect(this.page).toHaveURL(/view_cart/);
  }

  /**
   * Verifica que el producto seleccionado aparezca en el carrito.
   *
   * @param productName Nombre del producto esperado.
   */
  async verifyProductInCart(productName: string): Promise<void> {
    const product = this.page
      .locator("#cart_info")
      .getByText(productName, { exact: true });

    await expect(product).toBeVisible();
  }

  /**
   * Presiona el botón Proceed To Checkout.
   */
  async proceedToCheckout(): Promise<void> {
    const checkoutButton = this.page.locator(".check_out");

    await expect(checkoutButton).toBeVisible();

    await checkoutButton.click();
  }

  /**
   * Cierra el anuncio intersticial de Google si aparece.
   */
  async closeGoogleVignetteIfPresent(): Promise<void> {
    if (!this.page.url().includes("#google_vignette")) {
      return;
    }

    for (const frame of this.page.frames()) {
      const closeButton = frame.getByRole("button", {
        name: /close ad/i,
      });

      const isVisible = await closeButton.isVisible().catch(() => false);

      if (isVisible) {
        await closeButton.click();
        return;
      }
    }

    throw new Error(
      "No se encontró el botón para cerrar el anuncio de Google.",
    );
  }
}

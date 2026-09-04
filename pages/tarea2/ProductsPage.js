/**
 * Clase que representa las acciones en la sección de Productos y Carrito.
 */
export class ProductsPage {
  /**
   * @param {import('@playwright/test').Page} page - Instancia de la página de Playwright.
   */
  constructor(page) {
    this.page = page;
    this.poloBrandBtn = page.locator('a[href="/brand_products/Polo"]');
    this.firstAddToCartBtn = page.locator('(//a[contains(@class, "add-to-cart")])[1]');
    this.viewCartModalBtn = page.locator('#cartModal u:has-text("View Cart")');
    this.productNameInCart = page.locator('td.cart_description h4 a');
    this.proceedToCheckoutBtn = page.locator('a.check_out');
  }

  /**
   * Filtra por la marca POLO.
   */
  async selectPoloBrand() {
    await this.poloBrandBtn.click();
  }

  /**
   * Agrega el primer producto disponible al carrito.
   */
  async addFirstProductToCart() {
    await this.firstAddToCartBtn.click();
  }

  /**
   * Redirige al carrito desde la ventana modal.
   */
  async goToCartFromModal() {
    await this.viewCartModalBtn.click();
  }

  /**
   * Inicia el proceso de Checkout.
   */
  async proceedToCheckout() {
    await this.proceedToCheckoutBtn.click();
  }
}
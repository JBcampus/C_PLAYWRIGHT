import { Page, Locator, expect } from "@playwright/test";

/**
 * Page Object para la gestión de productos, carrito y checkout.
 */
export class ProductsPage {
  readonly page: Page;
  readonly searchInput: Locator;
  readonly searchButton: Locator;
  readonly cartLink: Locator;

  constructor(page: Page) {
    this.page = page;
    this.searchInput = page.locator("#search_product");
    this.searchButton = page.locator("#submit_search");
    this.cartLink = page.locator('a[href="/view_cart"]').first();
  }

  /**
   * Navega a la sección de productos.
   */
  async navigateToProducts() {
    await this.page.goto("https://automationexercise.com/products", {
      waitUntil: "domcontentloaded",
    });
    await this.removeAds();
  }

  /**
   * Remueve dinámicamente iframes publicitarios que puedan bloquear clics.
   */
  async removeAds() {
    try {
      await this.page.evaluate(() => {
        const adSelectors = [
          'iframe[id^="aswift_"]',
          'iframe[name^="ad_iframe"]',
          "#google_vignette",
          ".adsbygoogle",
        ];
        adSelectors.forEach((selector) => {
          document.querySelectorAll(selector).forEach((el) => el.remove());
        });
      });
    } catch (e) {}
  }

  /**
   * Busca un producto, agrega 2 unidades al carrito y maneja el modal de confirmación.
   * @param productName Nombre del producto a buscar.
   */
  async searchAndAddProducts(productName: string) {
    await this.page.goto("https://automationexercise.com/products", {
      waitUntil: "domcontentloaded",
    });
    await this.removeAds();

    await this.searchInput.fill(productName);
    await this.searchButton.click();
    await this.removeAds();

    const addButtons = this.page.locator(".productinfo .add-to-cart");
    for (let i = 0; i < 2; i++) {
      await addButtons.nth(i).waitFor({ state: "visible", timeout: 10000 });
      await addButtons.nth(i).click({ force: true });

      try {
        const modalButton = this.page
          .locator(".modal-content .btn-success")
          .first();
        await modalButton.waitFor({ state: "visible", timeout: 3000 });
        await modalButton.click({ force: true });
      } catch (e) {}
      await this.removeAds();
    }
  }

  /**
   * Filtra por categoría Mujer -> Tops y agrega 2 productos al carrito.
   */
  async filterWomenTopsAndAdd() {
    await this.removeAds();
    await this.page.goto("https://automationexercise.com/category_products/2", {
      waitUntil: "domcontentloaded",
    });
    await this.removeAds();

    const topAddButtons = this.page.locator(".productinfo .add-to-cart");
    for (let i = 0; i < 2; i++) {
      await topAddButtons.nth(i).waitFor({ state: "visible", timeout: 10000 });
      await topAddButtons.nth(i).click({ force: true });

      try {
        const modalButton = this.page
          .locator(".modal-content .btn-success")
          .first();
        await modalButton.waitFor({ state: "visible", timeout: 3000 });
        await modalButton.click({ force: true });
      } catch (e) {}
      await this.removeAds();
    }
  }

  /**
   * Navega al carrito de compras de manera nativa y segura.
   */
  async goToCart() {
    await this.removeAds();
    await this.cartLink.waitFor({ state: "visible", timeout: 10000 });
    await this.cartLink.click({ force: true });
    await this.removeAds();
  }

  /**
   * Rellena la tarjeta usando selectores estándar, confirma el pago esperando la redirección y presiona continuar.
   */
  async proceedToCheckoutAndFinalize() {
    // Clic en Proceed To Checkout desde el carrito
    const checkoutBtn = this.page.locator(".check_out").first();
    await checkoutBtn.waitFor({ state: "visible", timeout: 10000 });
    await checkoutBtn.click({ force: true });

    // En la pantalla de revisión de pedido, dar clic en "Place Order"
    const placeOrderBtn = this.page.locator('a[href="/payment"]').first();
    await placeOrderBtn.waitFor({ state: "visible", timeout: 10000 });
    await placeOrderBtn.click({ force: true });

    const paymentFields = [
      {
        selector: 'input[data-qa="name-on-card"]',
        value: "Jose Daniel Vicente Ramos",
      },
      {
        selector: 'input[data-qa="card-number"]',
        value: "4335849843543210",
      },
      { selector: 'input[data-qa="cvc"]', value: "548" },
      { selector: 'input[placeholder="MM"]', value: "10" },
      { selector: 'input[placeholder="YYYY"]', value: "2035" },
    ];

    for (const { selector, value } of paymentFields) {
      await this.page.locator(selector).fill(value);
    }

    const payButton = this.page.locator('button[data-qa="pay-button"]');
    await payButton.click();

    // Esperar directamente a que aparezca el encabezado de confirmación de orden
    const orderPlacedHeading = this.page.locator(
      'h2:has-text("Order Placed!")',
    );
    await orderPlacedHeading.waitFor({ state: "visible", timeout: 20000 });

    // Hacer clic en el botón "Continue" para volver a la página principal
    const continueButton = this.page.locator('a[data-qa="continue-button"]');
    await continueButton.waitFor({ state: "visible", timeout: 10000 });
    await continueButton.click({ force: true });
  }

  /**
   * Realiza el cierre de sesión de la cuenta.
   */
  async logout() {
    await this.removeAds();
    await this.page.click('a[href="/logout"]');
  }
}

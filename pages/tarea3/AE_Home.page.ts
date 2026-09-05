import { Locator, Page, expect } from "@playwright/test";

/** Page object de la pagina de inicio de Automation Exercise. */
export class AE_Home_Page {
  private readonly FEATURE_ITEMS: Locator;
  private readonly LINK_CONTACT_US: Locator;
  private readonly LINK_BRANDS_POLO: Locator;

  /**
   * Crea el page object y prepara los localizadores de la pagina de inicio.
   *
   * @param page - Instancia de pagina de Playwright.
   */
  constructor(private page: Page) {
    this.FEATURE_ITEMS = page.locator('div[class="features_items"]');
    this.LINK_CONTACT_US = page.locator('a[href="/contact_us"]');
    this.LINK_BRANDS_POLO = page.locator('a[href="/brand_products/Polo"]');
  }

  /** Navega a la pagina de inicio. */
  async gotoHome(): Promise<void> {
    await this.page.goto("https://automationexercise.com/");
  }

  /** Abre la pagina `Contact us`. */
  async clickContactUs(): Promise<void> {
    await this.LINK_CONTACT_US.click();
  }

  /** Verifica que la seccion de productos destacados sea visible. */
  async expectFeatureItems(): Promise<void> {
    await expect(this.FEATURE_ITEMS).toBeVisible();
  }

  /** Abre la pagina de productos de la marca Polo. */
  async clickBrandPolo(): Promise<void> {
    await this.LINK_BRANDS_POLO.click();
  }

  /** Verifica que la URL actual corresponda a la marca Polo. */
  async expectPoloURL(): Promise<void> {
    await expect(this.page).toHaveURL(/Polo/);
  }

  /** Bloquea las solicitudes de redes publicitarias para las pruebas. */
  async cerrarPublicidad(): Promise<void> {
    await this.page.route(
      /doubleclick\.net|googlesyndication\.com|googleadservices\.com|adsbygoogle|adservice\.google\.com/i,
      (route) => route.abort(),
    );
  }
}

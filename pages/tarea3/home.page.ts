import { Page, expect } from "@playwright/test";

/**
 * @class HomePage
 * @description Maneja la navegación principal en Automation Exercise.
 */
export class HomePage {
  readonly page: Page;
  readonly contactUsButton = 'a[href="/contact_us"]';

  constructor(page: Page) {
    this.page = page;
  }

  /**
   * Navega a la página de inicio de Automation Exercise.
   */
  async navigate(): Promise<void> {
    await this.page.goto("https://www.automationexercise.com/");
  }

  /**
   * Hace clic en el botón "Contact us".
   */
  async clickContactUs(): Promise<void> {
    await this.page.click(this.contactUsButton);
  }

  /**
   * Hace clic en la marca "POLO" en la barra lateral.
   */
  async clickBrandPolo(): Promise<void> {
    await this.page.click('a[href="/brand_products/Polo"]');
  }
}

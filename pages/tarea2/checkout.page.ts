import { expect, Page } from '@playwright/test';

/** Acciones para el formulario, resumen y confirmación de compra. */
export class CheckoutPage {
  constructor(private readonly page: Page) {}

  /** Verifica el título del formulario de información. */
  async expectYourInformation(): Promise<void> {
    await expect(this.page.locator('[data-test="title"]')).toHaveText('Checkout: Your Information');
  }

  /** Completa los datos ficticios y continúa al resumen. */
  async fillInformation(firstName: string, lastName: string, postalCode: string): Promise<void> {
    await this.page.locator('[data-test="firstName"]').fill(firstName);
    await this.page.locator('[data-test="lastName"]').fill(lastName);
    await this.page.locator('[data-test="postalCode"]').fill(postalCode);
    await this.page.locator('[data-test="continue"]').click();
  }

  /** Verifica la pantalla de resumen antes de finalizar. */
  async expectOverview(): Promise<void> {
    await expect(this.page.locator('[data-test="title"]')).toHaveText('Checkout: Overview');
  }

  /** Finaliza la compra de prueba. */
  async finish(): Promise<void> {
    await this.page.locator('[data-test="finish"]').click();
  }

  /** Verifica que el proceso de compra haya finalizado. */
  async expectComplete(): Promise<void> {
    await expect(this.page.locator('[data-test="title"]')).toHaveText('Checkout: Complete!');
    await expect(this.page.locator('[data-test="complete-header"]')).toHaveText('Thank you for your order!');
  }
}

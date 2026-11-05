/** Encapsula las acciones y validaciones de la pantalla de inicio de sesión. */
import { expect, Page } from '@playwright/test';

export class LoginPage {
  constructor(private readonly page: Page) {}

  /** Abre la página principal de SauceDemo. */
  async open(): Promise<void> {
    await this.page.goto("https://www.saucedemo.com/");
  }

  /** Completa las credenciales y envía el formulario. */
  async login(username: string, password: string): Promise<void> {
    await this.page.locator('[data-test="username"]').fill(username);
    await this.page.locator('[data-test="password"]').fill(password);
    await this.page.locator('[data-test="login-button"]').click();
  }

  /** Comprueba que el login haya llegado al inventario. */
  async expectInventory(): Promise<void> {
    await expect(this.page).toHaveURL(/\/inventory\.html$/);
    await expect(this.page.locator('[data-test="title"]')).toHaveText('Products');
  }
}
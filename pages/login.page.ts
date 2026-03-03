import { Page, Locator, expect } from "@playwright/test";

/**
 * Page Object de la pagina https://the-internet.herokuapp.com
 *
 * - Encapsula acciones y validación del flujo de login.
 * - Mantiene los tests organizados y reutilizables.
 */

export class LoginPage {
  private readonly username: Locator;
  private readonly password: Locator;
  private readonly submit: Locator;
  private readonly message: Locator;

  constructor(private page: Page) {
    this.username = page.locator("#user-name");
    this.password = page.locator("#password");
    this.submit = page.locator("#login-button");
    this.message = page.locator(".error-message-container");
  }

  async goto(): Promise<void> {
    await this.page.goto("https://www.saucedemo.com");
  }

  async login(username: string, password: string): Promise<void> {
    await this.username.fill(username);
    await this.password.fill(password);
    await this.submit.click();
  }

  async validateFail(): Promise<void> {
    await expect(this.message).toHaveText(/not match /);
  }

  async validateLogin(): Promise<void> {
    await expect(this.page).toHaveURL(/inventory/);
  }
}

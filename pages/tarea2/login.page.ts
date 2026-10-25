import { Page, expect } from "@playwright/test";

/**
 * @class LoginPage
 * @description Clase encargada de gestionar la autenticación de usuarios en SauceDemo.
 */
export class LoginPage {
  readonly page: Page;
  readonly usernameInput = '[data-test="username"]';
  readonly passwordInput = '[data-test="password"]';
  readonly loginButton = '[data-test="login-button"]';

  constructor(page: Page) {
    this.page = page;
  }

  /**
   * Navega a la página principal de SauceDemo.
   */
  async navigate(): Promise<void> {
    await this.page.goto("https://www.saucedemo.com/");
  }

  /**
   * Ingresa las credenciales y realiza el login.
   * @param username Nombre de usuario
   * @param password Contraseña
   */
  async login(username: string, password: string): Promise<void> {
    await this.page.fill(this.usernameInput, username);
    await this.page.fill(this.passwordInput, password);
    await this.page.click(this.loginButton);
  }
}

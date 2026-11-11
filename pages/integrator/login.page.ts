import { Page, Locator } from "@playwright/test";
import { LoggerHelper } from "../../helpers/logger.helper";

/**
 * Page Object para la gestión de la autenticación en Swag Labs.
 */
export class LoginPage {
  readonly page: Page;
  readonly usernameInput: Locator;
  readonly passwordInput: Locator;
  readonly loginButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.usernameInput = page.locator("#user-name");
    this.passwordInput = page.locator("#password");
    this.loginButton = page.locator("#login-button");
  }

  /**
   * Navega a la página principal de Swag Labs.
   */
  async navigateToLogin(): Promise<void> {
    LoggerHelper.info("Navegando a https://www.saucedemo.com/");
    await this.page.goto("https://www.saucedemo.com/");
  }

  /**
   * Realiza el proceso de inicio de sesión con las credenciales provistas.
   * @param username Nombre de usuario.
   * @param password Contraseña del usuario.
   */
  async login(username: string, password: string): Promise<void> {
    LoggerHelper.info(`Iniciando sesión con el usuario: ${username}`);
    await this.usernameInput.fill(username);
    await this.passwordInput.fill(password);
    await this.loginButton.click();
  }
}

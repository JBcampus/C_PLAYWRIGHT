import { Locator, Page, expect } from '@playwright/test';
import { LoginHelper } from '../../helpers/tarea2/loginHelper';

/**
 * Representa la página de autenticación de Swag Labs.
 * Proporciona localizadores y métodos de acción encapsulados.
 */
export class LoginPage {
  private readonly page: Page;
  private readonly usernameInput: Locator;
  private readonly passwordInput: Locator;
  private readonly loginButton: Locator;
  private readonly errorMessage: Locator;

  /**
   * Inicializa una nueva instancia de la clase LoginPage.
   * @param page - Objeto Page de Playwright.
   */
  constructor(page: Page) {
    this.page = page;
    this.usernameInput = page.locator('[data-test="username"]');
    this.passwordInput = page.locator('[data-test="password"]');
    this.loginButton = page.locator('[data-test="login-button"]');
    this.errorMessage = page.locator('[data-test="error"]');
  }

  /**
   * Navega hacia la URL raíz de la aplicación de pruebas.
   */
  async navigate(): Promise<void> {
    await this.page.goto(LoginHelper.baseUrl);
  }

  /**
   * Introduce las credenciales provistas y ejecuta la acción de login.
   * @param username - Nombre de usuario para acceder.
   * @param password - Contraseña asignada.
   */
  async login(username: string, password: string): Promise<void> {
    await this.usernameInput.fill(username);
    await this.passwordInput.fill(password);
    await this.loginButton.click();
  }

  /**
   * Realiza una aserción para verificar la presencia de un mensaje de error específico.
   * @param expectedText - El texto de error que se espera observar en pantalla.
   */
  async validateErrorMessage(expectedText: string): Promise<void> {
    await expect(this.errorMessage).toBeVisible();
    await expect(this.errorMessage).toContainText(expectedText);
  }
}

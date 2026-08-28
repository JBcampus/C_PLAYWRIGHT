import { Page, Locator } from '@playwright/test';

/**
 * Representa la página de Login y componentes globales de SauceDemo.
 */
export class SauceDemoPage {
  readonly page: Page;
  readonly usernameInput: Locator;
  readonly passwordInput: Locator;
  readonly loginButton: Locator;
  readonly secondaryTitle: Locator;
  readonly menuButton: Locator;
  readonly logoutLink: Locator;
  readonly errorMessage: Locator;

  /**
   * Inicializa los locators de la página.
   * @param page - Instancia de la página de Playwright.
   */
  constructor(page: Page) {
    this.page = page;
    this.usernameInput = page.locator('#user-name');
    this.passwordInput = page.locator('#password');
    this.loginButton = page.locator('#login-button');
    this.secondaryTitle = page.locator('.title');
    this.menuButton = page.locator('#react-burger-menu-btn');
    this.logoutLink = page.locator('#logout_sidebar_link');
    this.errorMessage = page.locator('[data-test="error"]');
  }

  /**
   * Navega a la página principal de SauceDemo.
   */
  async navigateTo() {
    await this.page.goto('https://www.saucedemo.com/');
  }

  /**
   * Inicia sesión con las credenciales indicadas.
   * @param username - Nombre de usuario.
   * @param password - Contraseña del usuario.
   */
  async login(username: string, password: string) {
    await this.usernameInput.fill(username);
    await this.passwordInput.fill(password);
    await this.loginButton.click();
  }

  /**
   * Despliega el menú lateral y selecciona la opción Logout.
   */
  async logout() {
    await this.menuButton.click();
    await this.logoutLink.click();
  }
}
import { Locator, Page, expect } from "@playwright/test";
/**
 * Page Object de la pagina https://www.saucedemo.com
 * - Encapsula acciones y validación del flujo de login.
 * - Mantiene los tests organizados y reutilizables.
 */

export class LoginPage {
  private readonly username: Locator;
  private readonly password: Locator;
  private readonly submit: Locator;
  private readonly message: Locator;

  private readonly errorContainer: Locator;

  /**
   * Crea una instancia de `LoginPage` ligada a un `Page` de Playwright.
   * @param page Instancia de Playwright `Page`.
   */
  constructor(private page: Page) {
    this.username = page.locator("#user-name");
    this.password = page.locator("#password");
    this.submit = page.locator("#login-button");
    this.message = page.locator(".error-message-container");

    this.errorContainer = page.locator("[data-test='error']");
  }

  /**
   * Navega a la página de login de Sauce Demo.
   * @returns Promise<void>
   * @example
   * await loginPage.goto();
   */
  async goto(): Promise<void> {
    await this.page.goto("https://www.saucedemo.com");
  }

  /**
   * Rellena los campos de usuario y contraseña y envía el formulario.
   * @param username Nombre de usuario.
   * @param password Contraseña.
   * @returns Promise<void>
   * @example
   * await loginPage.login('standard_user', 'secret_sauce');
   */
  async login(username: string, password: string): Promise<void> {
    await this.username.fill(username);
    await this.password.fill(password);
    await this.submit.click();
  }

  /**
   * Valida que el login falló mostrando el mensaje de error esperado.
   * @returns Promise<void>
   */
  async validateFail(): Promise<void> {
    await expect(this.message).toHaveText(/not match /);
  }

  /**
   * Valida que el login fue exitoso comprobando que la URL contiene "inventory".
   * @returns Promise<void>
   * @example
   * await loginPage.validateLogin();
   */
  async validateLogin(): Promise<void> {
    await expect(this.page).toHaveURL(/inventory/);
  }

  /**
   * Espera que el contenedor de error sea visible y contenga el texto indicado.
   * @param text Texto o expresión regular que debe contener el error.
   * @returns Promise<void>
   */
  async expectLoginErrorContains(text: string | RegExp): Promise<void> {
    await expect(this.errorContainer).toBeVisible();
    await expect(this.errorContainer).toHaveText(text);
  }

  /**
   * Devuelve el texto del error de login (si existe).
   * @returns Promise<string> Texto del error.
   */
  async getErrorText(): Promise<string> {
    return (await this.errorContainer.textContent())?.trim() ?? "";
  }
}

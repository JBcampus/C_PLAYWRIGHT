/**
 * Página de Login de Sauce Demo - Page Object Model (POM)
 *
 * Encapsula todos los elementos y acciones relacionados con el módulo de autenticación
 * de la aplicación Sauce Demo (Swag Labs). Proporciona métodos para navegar,
 * autenticarse, y cerrar sesión.
 *
 * @example
 * ```typescript
 * const loginPage = new SD_Login_Page(page);
 * await loginPage.gotoHome();
 * await loginPage.login("standard_user", "secret_sauce");
 * ```
 */
import { expect, Page } from "@playwright/test";

export class SD_Login_Page {
  /**
   * Constructor de la clase SD_Login_Page
   *
   * Inicializa el Page Object con una instancia de la página de Playwright
   *
   * @param page - La página de Playwright para interactuar con la aplicación
   */
  constructor(private page: Page) {}

  /**
   * Navega a la página principal de Sauce Demo
   *
   * Abre la URL base de la aplicación web Sauce Demo
   *
   * @returns Promise que se resuelve cuando la página carga completamente
   */
  async gotoHome() {
    await this.page.goto("https://www.saucedemo.com/");
  }

  /**
   * Obtiene las credenciales de un usuario predefinido
   *
   * Retorna el nombre de usuario y contraseña para los tipos de usuario disponibles
   *
   * @param data - Tipo de usuario: "standar" para usuario estándar o "locked_out" para usuario bloqueado
   * @returns Objeto con propiedades username y password del usuario solicitado
   */
  async obtenerUsuario(data: "standar" | "locked_out") {
    const users = {
      standar: { username: "standard_user", password: "secret_sauce" },
      locked_out: { username: "locked_out_user", password: "secret_sauce" },
    };
    return users[data];
  }

  /**
   * Realiza el inicio de sesión con las credenciales proporcionadas
   *
   * Completa el formulario de login con el nombre de usuario y contraseña,
   * y hace clic en el botón de autenticación
   *
   * @param user - Nombre de usuario para autenticarse
   * @param password - Contraseña del usuario
   * @returns Promise que se resuelve cuando el login se ha completado
   */
  async login(user: string, password: string) {
    await this.page.fill("#user-name", user);
    await this.page.fill("#password", password);
    await this.page.click("#login-button");
  }

  /**
   * Cierra la sesión del usuario autenticado
   *
   * Abre el menú lateral desplegable, hace clic en logout y valida que se haya
   * retornado a la página de login
   *
   * @returns Promise que se resuelve cuando el logout se ha completado y validado
   * @throws Error si no se puede validar que se ha retornado a la página de login
   */
  async logout() {
    await this.page.locator("#react-burger-menu-btn").click();
    await this.page.locator("#logout_sidebar_link").click();
    await expect(this.page).toHaveURL(/saucedemo.com/);
    await expect(this.page.locator("#login-button")).toBeVisible();
  }
}

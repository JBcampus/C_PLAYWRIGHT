import test, { expect } from "@playwright/test";
import { SD_Login_Page } from "../../pages/tarea2/SD_Login_Page";
import { SD_Login_Helpers } from "../../helpers/tarea2/SD_Login_Helpers";

/**
 * Suite de pruebas para el módulo de Login de Sauce Demo
 *
 * Valida los flujos de autenticación correcta e incorrecta usando el Page Object Model (POM)
 * y la aplicación web Sauce Demo (Swag Labs)
 *
 * @example
 * ```bash
 * npx playwright test SD_Login.spec.ts
 * ```
 */
test.describe("Sauce Demo - Módulo Login", () => {
  /**
   * Configuración previa para cada prueba
   *
   * Cierra el módulo de telemetría antes de ejecutar cada caso de prueba
   * @param page - La página de Playwright para interactuar con la aplicación
   */
  test.beforeEach(async ({ page }) => {
    await new SD_Login_Helpers(page).cerrarTelemetria();
  });

  /**
   * Caso de prueba 1: Valida la autenticación correcta de un usuario estándar
   *
   * Verifica que un usuario con credenciales válidas pueda:
   * - Acceder a la página de login
   * - Autenticarse exitosamente
   * - Acceder al área segura de inventario
   * - Realizar logout
   *
   * @param page - La página de Playwright para interactuar con la aplicación
   */
  test("Suite 1 - Test 1: Autenticación Valida con POM", async ({ page }) => {
    const loginPage = new SD_Login_Page(page);
    const usuario = loginPage.obtenerUsuario("standar");

    await test.step("Paso 1: Abrir página inicial", async () => {
      await loginPage.gotoHome();
      await expect(page).toHaveTitle(/Swag Labs/);
    });

    await test.step("Paso 2: Autenticar usuario", async () => {
      await loginPage.login((await usuario).username, (await usuario).password);
    });

    await test.step("Paso 3: Validar área segura", async () => {
      await expect(page).toHaveURL(/inventory.html/);
      await expect(page.locator('span[data-test="title"]')).toHaveText(
        "Products",
      );
    });

    await test.step("Paso 4: Logout sesión", async () => {
      await loginPage.logout();
    });
  });

  /**
   * Caso de prueba 2: Valida el manejo de autenticación bloqueada
   *
   * Verifica que un usuario bloqueado (locked_out) no pueda acceder y reciba
   * un mensaje de error apropiado indicando que ha sido bloqueado
   *
   * Verifica que un usuario con credenciales inválidas pueda:
   * - Acceder a la página de login
   * - Autenticarse con usuario bloqueado
   * - Mantenerse en la página de login
   * - Muestre mensaje de validación
   * @param page - La página de Playwright para interactuar con la aplicación
   */
  test("Suite 1 - Test 2: Autenticación Inválida con POM", async ({ page }) => {
    const loginPage = new SD_Login_Page(page);
    const usuario = loginPage.obtenerUsuario("locked_out");

    await test.step("Paso 1: Abrir página inicial", async () => {
      await loginPage.gotoHome();
      await expect(page).toHaveTitle(/Swag Labs/);
    });

    await test.step("Paso 2: Autenticar usuario", async () => {
      await loginPage.login((await usuario).username, (await usuario).password);
    });

    await test.step("Paso 3: Validar área bloqueada", async () => {
      await expect(page.locator('h3[data-test="error"]')).toHaveText(
        "Epic sadface: Sorry, this user has been locked out.",
      );
      await expect(page.locator("#login-button")).toBeVisible();
    });
  });
});

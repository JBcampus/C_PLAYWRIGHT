import { expect, test } from "@playwright/test";
import { LoginPage } from "../../pages/tarea2/login_page";

test.describe("Autenticación saucedemo con POM y Helpers", () => {
  test.beforeAll(async () => {
    console.log("Inicializando prueba Navegación y acciones");
  });

  test.beforeEach(async ({ page }) => {
    console.log("Iniciando prueba");
  });

  test.afterEach(async () => {
    console.log("Finalizando prueba");
  });

  test.afterAll(async () => {
    console.log("Finalizando suite");
  });

  test("Autenticación Valida", async ({ page }) => {
    const login = new LoginPage(page);
    await login.goToLogin();
    await login.login("standard_user", "secret_sauce");

    await expect(page).toHaveTitle(/Swag Labs/);
    await expect(page).toHaveURL(/inventory.html/);
    await expect(page.locator('[data-test="title"]')).toHaveText("Products");

    await login.logout();
    await expect(page).toHaveURL("https://www.saucedemo.com/");
  });

  test("Autenticación Invalida", async ({ page }) => {
    const login = new LoginPage(page);
    await login.goToLogin();
    await login.login("standard_user", "password");

    await expect(page.locator('[data-test="error"]')).toBeVisible();
  });
});

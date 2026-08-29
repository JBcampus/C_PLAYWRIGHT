import { expect, test } from "@playwright/test";
import { LoginPage } from "../../pages/tarea2/login.page";
import { UserHelper } from "../../helpers/tarea2/login.helper";

test.describe("Autenticación con POM y helpers", () => {
  test.beforeAll(async () => {
    console.log("[SUITE] Inicializando suite de autenticación");
  });
  test.afterAll(async () => {
    console.log("[SUITE] Finalizando suite de autenticación");
  });
  test.afterEach(async () => {
    console.log("[TEST] Finalizando test");
  });

  test("Autenticación valida", async ({ page }) => {
    const login = new LoginPage(page);
    const UHelper = new UserHelper(page);

    const usuario = UHelper.getTestUser("valido");

    await login.goto();
    await login.login(usuario.username, usuario.password);

    // Tu validación (assertion)
    await expect(page).toHaveURL(/inventory.html/);
    await expect(page.locator('[data-test="title"]')).toHaveText("Products");

    await login.logout();
    await expect(page).toHaveURL(/saucedemo.com/);
  });

  test("Login fallido con usuario inválido", async ({ page }) => {
    const login = new LoginPage(page);
    const userHelper = new UserHelper(page);
    const usuarioErroneo = userHelper.getTestUser("invalido");

    await login.goto();
    await login.login(usuarioErroneo.username, usuarioErroneo.password);

    // Validación de error
    const errorMessage = page.locator('[data-test="error"]');
    await expect(errorMessage).toBeVisible();
  });
});

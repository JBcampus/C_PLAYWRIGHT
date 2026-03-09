import { test } from "@playwright/test";
import { LoginPage } from "../../pages/login.page";

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

  test("Login válido", async ({ page }) => {
    const login = new LoginPage(page);
    await login.goto();
    await login.login("standard_user", "secret_sauce");
    await login.validateLogin();
  });

  test("Login inválido", async ({ page }) => {
    const login = new LoginPage(page);
    await login.goto();
    await login.login("invalid", "secret_sauce");
    await login.validateFail();
  });
  
});

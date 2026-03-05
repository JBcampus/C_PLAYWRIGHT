import { test } from "@playwright/test";
import { LoginPage } from "../../pages/login.page";
import { saveAuthState } from "../../helpers/utils/auth.helper";

test.describe("Taller 6 - Setup storageState", () => {
  test("Guardar estado de autenticación de usuario estandar", async ({ page }) => {
    const login = new LoginPage(page);
    await test.step("Ir a login", async () => {
      await login.goto();
    });
    await test.step("Autenticación (standard_user)", async () => {
      await login.login("standard_user", "secret_sauce");
      await login.validateLogin();
    });
    await test.step("Inspección de estado y locators con pause()", async () => {
      await page.pause();
    });
    await test.step("Guardar storageState en /auth", async () => {
      await page.context().storageState({ path: saveAuthState("standard_auth.json") });
    });
  });
});

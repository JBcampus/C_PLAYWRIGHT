import { test, expect } from "@playwright/test";
import { mkdir } from "node:fs/promises";
import path from "node:path";
import { LoginPage } from "../../pages/integrator/login.page";
import { LoggerHelper } from "../../helpers/logger.helper";

const authFile = "playwright/.auth/user.json";
const evidenciasDir = path.join(process.cwd(), "reports", "evidencias");

test.describe("Suite 1: Autenticación y almacenamiento de estado", () => {
  test("Autenticarse con usuario estándar y guardar estado", async ({
    page,
  }) => {
    const loginPage = new LoginPage(page);

    await test.step("Navegar y autenticarse en Swag Labs", async () => {
      await mkdir(evidenciasDir, { recursive: true });
      await loginPage.navigateToLogin();
      await page.screenshot({
        path: path.join(evidenciasDir, "1-suite1-login.png"),
        fullPage: true,
      });
      await loginPage.login("standard_user", "secret_sauce");
    });

    await test.step("Validar login exitoso y guardar estado de sesión", async () => {
      expect(page.url()).toContain("inventory");
      LoggerHelper.info("Login exitoso. Guardando estado de autenticación.");
      await page.context().storageState({ path: authFile });
    });
  });
});

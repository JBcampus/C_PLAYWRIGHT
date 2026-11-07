import { test, expect } from "@playwright/test";
import { SignupPage } from "../../pages/integrador/signup.page";
import { getSavedCredentials } from "../../helpers/integrador.helper";
import * as path from "path";

const authFile = path.join(process.cwd(), "tests/integrador/.auth/user.json");

test.describe("Suite 2 - Flujo de Autentificación y Estado", () => {
  test("Autenticar usuario y guardar estado de sesión", async ({ page }) => {
    const signupPage = new SignupPage(page);
    const credentials = getSavedCredentials();

    await test.step("Navegar a la página de autentificación", async () => {
      await signupPage.navigate();
    });

    await test.step("Ingresar credenciales generadas", async () => {
      await signupPage.login(credentials.email, credentials.pass);
    });

    await test.step("Validar autentificación exitosa", async () => {
      await expect(page.locator('a:has-text("Logged in as")')).toBeVisible();
    });

    await test.step("Guardar estado de sesión", async () => {
      await page.context().storageState({ path: authFile });
    });

    await test.step("Capturar evidencia de autentificación", async () => {
      const reportsDir = path.join(process.cwd(), "reports");
      await page.screenshot({
        path: path.join(reportsDir, "suite2-auth-success.png"),
        fullPage: true,
      });
    });
  });
});

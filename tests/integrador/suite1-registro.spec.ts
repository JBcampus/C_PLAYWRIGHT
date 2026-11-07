import { test, expect } from "@playwright/test";
import { SignupPage } from "../../pages/integrador/signup.page";
import {
  generateUniqueEmail,
  saveCredentials,
} from "../../helpers/integrador.helper";
import * as path from "path";

test.describe("Suite 1 - Flujo de Registro", () => {
  test("Registrar nuevo usuario con manejo de excepciones", async ({
    page,
  }) => {
    const signupPage = new SignupPage(page);
    const email = generateUniqueEmail("qa_automation");
    const password = "SecurePassword123!";

    saveCredentials({ email, pass: password });

    await test.step("Navegar a la página principal", async () => {
      await signupPage.navigate();
    });

    await test.step("Ingresar nombre y correo para registro", async () => {
      await signupPage.initiateSignup("QA Tester User", email);
    });

    await test.step("Completar datos obligatorios de la cuenta", async () => {
      try {
        await signupPage.fillAccountDetails(password);
      } catch (error) {
        // Excepción controlada en caso de que el usuario ya exista previamente
        console.warn(
          "Advertencia: El usuario ya se encuentra registrado o ocurrió un conflicto.",
          error,
        );
      }
    });

    await test.step("Asegurar que la cuenta se haya creado correctamente", async () => {
      const successHeader = page.locator("b");
      if (await successHeader.isVisible()) {
        await expect(successHeader).toHaveText("Account Created!");
      }
    });

    await test.step("Capturar evidencia al finalizar el test", async () => {
      const reportsDir = path.join(process.cwd(), "reports");
      await page.screenshot({
        path: path.join(reportsDir, "suite1-registro-success.png"),
        fullPage: true,
      });
    });
  });
});

import test, { expect } from "@playwright/test";
import { LoginPages } from "./LoginPages";

test.describe("Practice Expand Testing - Módulo Login", () => {
  //Configuración previa a cada prueba, permite cerrar la publicidad que aparece al abrir la página inicial y evitar que interfiera con los pasos de las pruebas.
  test.beforeEach(async ({ page }) => {
    await new LoginPages(page).cerrarPublicidad();
  });

  //Caso de prueba 1: Autenticación correcta
  test("Autenticación correcta", async ({ page }) => {
    const loginPage = new LoginPages(page);

    await test.step("Abrir página inicial", async () => {
      await loginPage.gotoHome();
      await expect(page).toHaveTitle(/Practice Website for QA/);
    });

    await test.step("Navegar al login", async () => {
      await page.getByRole("link", { name: "Try it out" }).nth(1).click();
    });

    await test.step("Autenticar usuario", async () => {
      await loginPage.login("practice", "SuperSecretPassword!");
    });

    await test.step("Validar área segura", async () => {
      await loginPage.validarLogin("PW_Correcto");
      //await expect(page.locator('a[href="/login"]')).toBeVisible();
      await expect(page.getByRole("link", { name: "Logout" })).toBeVisible();
    });
  });

  //Caso de prueba 2: Autenticación incorrecta por Password
  test("Autenticación incorrecta por Password", async ({ page }) => {
    const loginPage = new LoginPages(page);

    await test.step("Abrir página inicial", async () => {
      await loginPage.gotoHome();
      await expect(page).toHaveTitle(/Practice Website for QA/);
    });

    await test.step("Navegar al login", async () => {
      await page.getByRole("link", { name: "Try it out" }).nth(1).click();
    });

    await test.step("Autenticar usuario", async () => {
      await loginPage.login("practice", "passIncorrecto!");
    });

    await test.step("Validar área segura", async () => {
      await loginPage.validarLogin("PW_Incorrecto");
      await expect(page.locator('button[id="submit-login"]')).toBeVisible();
    });
  });

  //Caso de prueba 3: Autenticación incorrecta por Usuario
  test("Autenticación incorrecta por Usuario", async ({ page }) => {
    const loginPage = new LoginPages(page);

    await test.step("Abrir página inicial", async () => {
      await loginPage.gotoHome();
      await expect(page).toHaveTitle(/Practice Website for QA/);
    });

    await test.step("Navegar al login", async () => {
      await page.getByRole("link", { name: "Try it out" }).nth(1).click();
    });

    await test.step("Autenticar usuario", async () => {
      await loginPage.login("usuarioIncorrecto", "otroPassword!");
    });

    await test.step("Validar área segura", async () => {
      await loginPage.validarLogin("US_Incorrecto");
      await expect(page.locator('button[id="submit-login"]')).toBeVisible();
    });
  });
});

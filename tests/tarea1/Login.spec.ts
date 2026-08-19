import test, { expect } from "@playwright/test";
import { LoginPages } from "./LoginPages";

test.describe("Practice Expand Testing - Módulo Login", () => {
  //Caso de prueba 1: Autenticación correcta
  test("Autenticación correcta", async ({ page }) => {
    const loginPage = new LoginPages(page);

    await test.step("Abrir página inicial", async () => {
      await loginPage.gotoHome();
      await expect(page).toHaveTitle(/Practice Website for QA/);
      await loginPage.cerrarPublicidad();
    });

    await test.step("Navegar al login", async () => {
      await page.getByRole("link", { name: "Try it out" }).nth(1).click();
      await loginPage.cerrarPublicidad();
    });

    await test.step("Autenticar usuario", async () => {
      await loginPage.login("practice", "SuperSecretPassword!");
      await loginPage.cerrarPublicidad();
    });

    await test.step("Validar área segura", async () => {
      await loginPage.validarLogin("PW_Correcto");
      //await expect(page.locator('a[href="/login"]')).toBeVisible();
      await expect(page.getByRole("link", { name: "Logout" })).toBeVisible();
      await loginPage.cerrarPublicidad();
    });
  });

  //Caso de prueba 2: Autenticación incorrecta x Password
  test("Autenticación incorrecta x Password", async ({ page }) => {
    const loginPage = new LoginPages(page);

    await test.step("Abrir página inicial", async () => {
      await loginPage.gotoHome();
      await expect(page).toHaveTitle(/Practice Website for QA/);
      await loginPage.cerrarPublicidad();
    });

    await test.step("Navegar al login", async () => {
      await page.getByRole("link", { name: "Try it out" }).nth(1).click();
      await loginPage.cerrarPublicidad();
    });

    await test.step("Autenticar usuario", async () => {
      await loginPage.login("practice", "passIncorrecto!");
      await loginPage.cerrarPublicidad();
    });

    await test.step("Validar área segura", async () => {
      await loginPage.validarLogin("PW_Incorrecto");
      await expect(page.locator('button[id="submit-login"]')).toBeVisible();
      await loginPage.cerrarPublicidad();
    });
  });

  //Caso de prueba 3: Autenticación incorrecta x Usuario
  test("Autenticación incorrecta x Usuario", async ({ page }) => {
    const loginPage = new LoginPages(page);

    await test.step("Abrir página inicial", async () => {
      await loginPage.gotoHome();
      await expect(page).toHaveTitle(/Practice Website for QA/);
      await loginPage.cerrarPublicidad();
    });

    await test.step("Navegar al login", async () => {
      await page.getByRole("link", { name: "Try it out" }).nth(1).click();
      await loginPage.cerrarPublicidad();
    });

    await test.step("Autenticar usuario", async () => {
      await loginPage.login("usuarioIncorrecto", "otroPassword!");
      await loginPage.cerrarPublicidad();
    });

    await test.step("Validar área segura", async () => {
      await loginPage.validarLogin("US_Incorrecto");
      await expect(page.locator('button[id="submit-login"]')).toBeVisible();
      await loginPage.cerrarPublicidad();
    });
  });
});

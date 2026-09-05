import test, { expect } from "@playwright/test";

test.describe("Navegacion Basica y Flujo login", () => {
  // BLOQUEADOR DE ANUNCIOS: Bloquea scripts de publicidad antes de cargar la página
  test.beforeEach(async ({ page }) => {
    await page.route("**/*.{js,html}", (route) => {
      const url = route.request().url();
      if (
        url.includes("google") ||
        url.includes("doubleclick") ||
        url.includes("ads") ||
        url.includes("iotmart")
      ) {
        return route.abort(); // Cancela la carga del anuncio
      }
      return route.continue();
    });

    // Navegación a la página practice.expandtesting
    await page.goto("https://practice.expandtesting.com/");
  });

  //Test 1.Autenticación correcta
  test("Test 1. Autenticación Correcta", async ({ page }) => {
    // Localizar el botón "Try it out" de la tarjeta de Login
    const loginButton = page
      .locator(".card", { has: page.locator('[href="/login"]') })
      .getByRole("link", { name: "Try it out" });

    // TRUCO: Forzar el clic vía eventos de JS para saltarse anuncios invisibles
    await loginButton.dispatchEvent("click");

    // Aserciones para validar el ingreso
    await expect(page).toHaveURL("https://practice.expandtesting.com/login");
    // await expect(page).toHaveURL(".*expandtesting\.com\/login");

    // Ingresar usuario válido
    await page.locator("#username").fill("practice");

    // Ingresar contraseña válida
    await page.locator("#password").fill("SuperSecretPassword!");

    // Hacer clic en Login
    await page.locator("#submit-login").click();

    // Validar que el login fue exitoso
    await expect(page).toHaveURL(/secure/);

    // Validar mensaje de error
    await expect(
      page.getByText("You logged into a secure area!"),
    ).toBeVisible();
  });

  //Test 2. Autenticación Incorrecta
  test("Test 2. Autenticación Incorrecta", async ({ page }) => {
    // Localizar el botón "Try it out" de la tarjeta de Login
    const loginButton = page
      .locator(".card", { has: page.locator('[href="/login"]') })
      .getByRole("link", { name: "Try it out" });

    // TRUCO: Forzar el clic vía eventos de JS para saltarse anuncios invisibles
    await loginButton.dispatchEvent("click");

    // Aserciones para validar el ingreso
    await expect(page).toHaveURL("https://practice.expandtesting.com/login");
    // await expect(page).toHaveURL(".*expandtesting\.com\/login");

    // Ingresar usuario válido
    await page.locator("#username").fill("practice");

    // Ingresar contraseña válida
    await page.locator("#password").fill("¡SuperSecretPassword!");

    // Hacer clic en Login
    await page.locator("#submit-login").click();

    // Validar que el login fue exitoso
    await expect(page).toHaveURL(/login/);

    // Validar mensaje de error
    await expect(page.getByText("Your password is invalid!")).toBeVisible();
  });
});

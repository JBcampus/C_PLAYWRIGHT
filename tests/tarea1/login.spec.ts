import { test, expect } from "@playwright/test";

test.describe("Suite 1: Flujo de login en Expand Testing", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("https://practice.expandtesting.com/");

    // 2. Ubicar la tarjeta del ejercicio usando su contenedor semántico
    const loginCard = page.locator(".card", { hasText: "Test Login Page" });

    const linkElement = loginCard.getByRole("link", { name: "Try it out" });
    const targetUrl = await linkElement.getAttribute("href");

    if (targetUrl) {
      await page.goto(`https://practice.expandtesting.com${targetUrl}`);
    } else {
      await page.goto("https://expandtesting.com");
    }

    // Validar llegada exitosa a la vista de autenticación
    await expect(page).toHaveURL(/.*login/);
  });

  test("Test 1: Autenticación correcta", async ({ page }) => {
    // 4. Completar formulario con credenciales válidas
    await page.getByLabel("Username").fill("practice");
    await page.getByLabel("Password").fill("SuperSecretPassword!");

    // 5. Iniciar sesión
    await page.getByRole("button", { name: "Login" }).click();

    // 6. Validar redirección a la ruta final exacta de éxito (/secure)
    await expect(page).toHaveURL(/.*secure/);
    await expect(page.locator("#flash")).toContainText(
      "You logged into a secure area!",
    );
  });

  test("Test 2: Autenticación incorrecta", async ({ page }) => {
    // 4. Completar formulario con datos inválidos
    await page.getByLabel("Username").fill("usuario_invalido");
    await page.getByLabel("Password").fill("clave_incorrecta");

    // 5. Iniciar sesión
    await page.getByRole("button", { name: "Login" }).click();

    // 6. Validar que permanece en la vista de login con su alerta de error
    await expect(page).toHaveURL(/.*login/);
    await expect(page.locator("#flash")).toContainText(
      "Your username is invalid!",
    );
  });
});

import { Page, expect } from "@playwright/test";
import type { Credentials, Result } from "./types";

/**
 * Ejecuta el flujo de login en la página web usando Playwright.
 */
export const executeLogin = async (
  page: Page,
  creds: Credentials,
): Promise<Result<boolean>> => {
  try {
    // Navegar a la página principal
    await page.goto("https://practice.expandtesting.com/");

    // Ubicar el botón "Try it out" de Test Login Page y hacer clic
    const tryItOutButton = page.locator('a[href="/login"]', {
      hasText: "Try it out",
    });
    await tryItOutButton.click();

    // Completar el formulario con las credenciales provistas
    await page.fill("#username", creds.username);
    await page.fill("#password", creds.password);

    // Hacer clic en el botón de login
    await page.click('button[type="submit"]');

    // Validar si redirigió al área segura o mostró un error
    const currentUrl = page.url();
    if (currentUrl.includes("secure")) {
      return { ok: true, data: true, message: "Login exitoso al área segura" };
    } else {
      const errorText = await page.locator("#flash").textContent();
      return {
        ok: false,
        message: errorText ? errorText.trim() : "Error en las credenciales",
      };
    }
  } catch (error) {
    return { ok: false, message: `Error durante la ejecución: ${error}` };
  }
};

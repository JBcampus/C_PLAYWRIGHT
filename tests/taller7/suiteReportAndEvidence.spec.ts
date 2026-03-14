import { expect, test } from "@playwright/test";

test.describe("T7 · Reportes y evidencias (test, fixme, fail)", () => {
  // Marca toda la suite como "fixme" en WebKit (se saltan lostests en  ese motor)
  test.fixme(({ browserName }) => browserName === "webkit", "Issue #123 en WebKit");

  // 1) Caso estable: evidencia solo si falla (config global: screenshot/trace/video on-failure)
  test("TodoMVC: agrega 1 ítem estable", async ({ page }) => {
    await page.goto("https://demo.playwright.dev/todomvc/#/");
    await test.step("Agregar un TODO", async () => {
      await page.fill(".new-todo", "Tarea A");
      await page.keyboard.press("Enter");
    });
    await test.step("Validar cantidad", async () => {
      await expect(page.locator(".todo-list li")).toHaveCount(1);
    });
  });

  // 2) Fallo real para ver evidencias retenidas
  test("Demo que falla para ver evidencias", async ({ page }) => {
    await page.goto("https://example.com");
    await expect(page.locator("h2.no-existe")).toBeVisible();
  });

  // 3) Fallo "esperado" condicional (no rompe el build en Firefox, pero sí genera evidencias)
  test("Fallo esperado en Firefox (corre y falla sin romper build)", async ({
    page,
    browserName,
  }) => {
    test.fail(browserName === "firefox", "Bug #456 en Firefox");
    await page.goto("https://playwright.dev/");
    await expect(page.getByRole("link", { name: "NO EXISTE" })).toBeVisible();
  });
});

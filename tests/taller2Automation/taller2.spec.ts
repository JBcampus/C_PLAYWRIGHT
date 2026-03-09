import { expect, test } from "@playwright/test";
import * as path from "node:path";

test.describe("Taller 2 - AutomationExercise - Contact Us", () => {
  test.beforeEach(async () => {
    console.log("Iniciando test");
  });

  test.afterEach(async () => {
    console.log("Finalizando test");
  });

  test("Ingresar a modulo contact us", async ({ page }) => {
    // 1. Ir a la pagina de automationExercise
    await page.goto("https://automationexercise.com/");
    await page.waitForLoadState("domcontentloaded");
  });

  test("Completar formulario y validar envío", async ({ page }) => {
    // 2. Ir al modulo de contact us
    await page.goto("https://automationexercise.com/contact_us");
    await page.waitForSelector('input[data-qa="name"]', { state: "visible" });

    // 3. Completar formulario
    await page.locator('input[data-qa="name"]').fill("Christian Tester");
    await page.locator('input[data-qa="email"]').fill("christian@example.com");
    await page.locator('input[data-qa="subject"]').fill("Consulta de prueba");
    await page
      .locator('textarea[data-qa="message"]')
      .fill("Este es un mensaje de prueba enviado desde Playwright.");

    // 4. Subir archivo data.txt
    const filePath = path.join(process.cwd(), "data", "demo-upload.txt");
    await page.setInputFiles('input[name="upload_file"]', filePath);

    // 5. Validar que el archivo se cargó
    const fileInput = page.locator('input[name="upload_file"]');
    const files = await fileInput.evaluate((input: HTMLInputElement) =>
      input.files ? Array.from(input.files).map((f) => f.name) : [],
    );
    expect(files).toContain("demo-upload.txt");

    // 6. Escuchar diálogo JS (alert)
    page.once("dialog", async (dialog) => {
      console.log("Dialog detectado:", dialog.message());
      await dialog.accept();
    });

    // 7. Enviar formulario
    await page.getByRole("button", { name: "Submit" }).click();

    // 8. Validar mensaje de éxito
    const successMsg = page.locator("div.status.alert.alert-success");
    await expect(successMsg).toBeVisible();
    await expect(successMsg).toHaveText("Success! Your details have been submitted successfully.");

    // 9. Presionar Home
    await page.getByRole("link", { name: " Home" }).click();

    // 10. Validar que regresó al home
    await expect(page).toHaveURL("https://automationexercise.com/");
  });
});

import { test } from "@playwright/test";
import path from "node:path";
test.describe("Taller 2 - Diálogos JS y Upload de archivos", () => {
  test.beforeEach(async () => {
    console.log("Iniciando test");
  });
  test.afterEach(async () => {
    console.log("Finalizando test");
  });

  test("Navegar Pagina", async ({ page }) => {
    await page.goto("https://automationexercise.com/");
    await page.waitForLoadState("domcontentloaded");

    // 1. Click en Contact us
    await page.getByRole("link", { name: " Contact us" }).click();
    // 2. Completar Formulario
    await page.getByRole("textbox", { name: "Name" }).fill("Eva");
    await page.getByRole("textbox", { name: "Email", exact: true }).fill("eva@example.com");
    await page.getByRole("textbox", { name: "Subject" }).fill("Automation");
    await page
      .getByRole("textbox", { name: "Your Message Here" })
      .fill("Hola, este es un mensaje de prueba para el formulario de contacto.");

    // Preparar ruta del archivo
    const filePath = path.join(process.cwd(), "data", "demo-upload.txt");

    // Subir archivo
    await page.locator('input[type="file"]').setInputFiles(filePath);

    // Enviar formulario
    await page.getByRole("button", { name: "Submit" }).click({ force: true });
    ////DIALOG
    await page.getByRole("button", { name: "Choose File" }).setInputFiles(filePath);
    await page.getByRole("button", { name: "Submit" }).click();
    await page.locator("#contact-page").getByText("Success! Your details have");
  });
});

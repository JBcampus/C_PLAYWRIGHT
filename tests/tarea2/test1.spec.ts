import { expect, test } from "@playwright/test";
import * as path from "node:path";

test.describe("Tarea 2 : automationexercise.com ", () => {
  test.beforeEach(async () => {
    console.log("Iniciando test");
  });
  test.afterEach(async () => {
    console.log("Iniciando test");
  });

  test("Tarea 2 - Formulario", async ({ page }) => {
    await page.goto("https://automationexercise.com/");
    await page.waitForLoadState("domcontentloaded");

    //Conact Us
    await page.click("text= Contact us");

    await page.getByRole("textbox", { name: "Name" }).fill("Javier");
    await page.getByRole("textbox", { name: "Email", exact: true }).fill("test@gmail.com");
    await page.getByRole("textbox", { name: "Subject" }).fill("Pruebas de tarea 2");
    await page.getByRole("textbox", { name: "Your Message Here" }).fill("ejemplo tarea 2");

    //Subir Archivo
    // Creamos un archivo en data con nombre demo-upload.txt.
    await page.waitForLoadState("domcontentloaded");
    const filePath = path.join(process.cwd(), "data", "test_tarea2.txt");
    console.log(filePath);
    await page.setInputFiles('input[name="upload_file"]', filePath);

    //dialogo
    page.on("dialog", (dialog) => {
      console.log(`Dialog message: ${dialog.message()}`);
      dialog.accept().catch(() => {});
    });

    await page.getByRole("button", { name: "Submit" }).click();

    //Confirmacion
    await expect(page.locator("div.status.alert.alert-success")).toHaveText(
      "Success! Your details have been submitted successfully.",
    );

    //boton Home
    await page.locator("a[class='btn btn-success'] span").click();

    //Home
    await page.waitForLoadState("domcontentloaded");
    await expect(page).toHaveURL("https://automationexercise.com/");
  });
});

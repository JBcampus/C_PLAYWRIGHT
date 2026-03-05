import { test } from "@playwright/test";
import * as path from "node:path";

test.describe("Tarea 2 - Upload de archivos", () => {
  test.beforeEach(async () => {
    console.log("Iniciando test");
  });
  test.afterEach(async () => {
    console.log("Iniciando test");
  });

  test("Capturar alert/confirm/prompt", async ({ page }) => {
    await page.goto("https://automationexercise.com/");
    await page.waitForLoadState("networkidle");
    // Escuchamos cualquier diálogo JS que aparezca
    page.on("dialog", async (dialog) => {
      console.log(`Dialog detectado: ${dialog.type()} | ${dialog.message()}`);
      if (dialog.type() === "prompt") {
        await dialog.accept("Press OK to proceed!");
      } else if (dialog.type() === "confirm") {
        // Podríamos ACEPTAR:
        //await dialog.dismiss();
        await dialog.accept();
      } else {
        // alert normal => aceptar
        await dialog.accept();
      }
    });
    //Clic cerrar AD
    //await page.getByRole("button", { name: "Click for JS Alert" }).click();
    //Clic a Contact us:
    //await page.locator('iframe[name="aswift_4"]').contentFrame().getByRole('button', { name: 'Close ad' }).click();
    await page.getByRole("link", { name: " Contact us" }).click();
    //Llenado de formulario : NOMBRE
    await page.getByRole("textbox", { name: "Name" }).click();
    await page.getByRole("textbox", { name: "Name" }).fill("Mi nombre ficticio");
    //Llenado de correo: COREO
    await page.getByRole("textbox", { name: "Email", exact: true }).click();
    await page.getByRole("textbox", { name: "Email", exact: true }).fill("micorreo@gmail.com");
    //Llenado de subject : SUBJECT
    await page.getByRole("textbox", { name: "Subject" }).click();
    await page.getByRole("textbox", { name: "Subject" }).fill("Aqui el asunto del correo");
    //Llenado de mensaje: AQUI CORREO
    await page.getByRole("textbox", { name: "Your Message Here" }).click();
    await page
      .getByRole("textbox", { name: "Your Message Here" })
      .fill("Este correo es debido a una prueba");
    //Carga de archivo: FILE
    const filePath = path.join(process.cwd(), "data", "demo-upload.txt");
    console.log(filePath);
    ////DIALOG
    await page.getByRole("button", { name: "Choose File" }).setInputFiles(filePath);
    await page.getByRole("button", { name: "Submit" }).click();
    await page.locator("#contact-page").getByText("Success! Your details have");
  });
});

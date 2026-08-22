import { expect, test } from "@playwright/test";
import * as path from "node:path";

test.describe("Taller 4- Diálogos JS y Upload de archivos", () => {
  test.beforeEach(async () => {
    console.log("Iniciando test");
  });

  test.afterEach(async () => {
    console.log("Finalizando test");
  });

  test("Capturar alert/confirm/prompt", async ({ page }) => {
    await page.goto("https://practice.expandtesting.com/js-dialogs");
    await page.waitForLoadState("domcontentloaded");

    // Escuchamos cualquier diálogo JS que aparezca
    page.on("dialog", async (dialog) => {
      console.log(`Dialog detectado: ${dialog.type()} |${dialog.message()}`);
      if (dialog.type() === "prompt") {
        await dialog.accept("Hola desde Playwright");
      } else if (dialog.type() === "confirm") {
        // Podríamos cancelar:
        await dialog.dismiss();
      } else {
        // alert normal => aceptar
        await dialog.accept();
      }
    });

    // 1. Alert
    await page.click("#js-alert");
    await expect(page.locator("#dialog-response")).toHaveText("OK");

    // 2. Confirm
    await page.click("#js-confirm");
    // Como hicimos dismiss() arriba, la página mostrará "You clicked: Cancel"
    await expect(page.locator("#dialog-response")).toHaveText("Cancel");

    // 3. Prompt
    await page.click("#js-prompt");
    // Aceptamos con 'Hola desde Playwright'
    await expect(page.locator("#dialog-response")).toHaveText(
      "Hola desde Playwright",
    );
  });

  test("Subida de archivo (file upload) - practice.expandtesting.com", async ({
    page,
  }) => {
    await page.goto("https://practice.expandtesting.com/upload");
    await page.waitForLoadState("domcontentloaded");
    // Creamos un archivo en data con nombre demo-upload.txt.
    const filePath = path.join(process.cwd(), "data", "demo-upload.txt");

    // input type="file" tiene id="file-upload"
    await page.setInputFiles("#fileInput", filePath);

    // botón "Upload"
    await page.click("#fileSubmit");
    //WaitForSelector
    await page.waitForSelector("#uploaded-files", {
      state: "visible",
      timeout: 5000,
    });
    //WaitForState
    //await page.locator("uploaded-files").waitFor({state:"visible"})
    await expect(page.locator("#uploaded-files")).toHaveText(/demo-upload/);
  });

  test("Subida de archivo (file upload) - the-internet.herokuapp.com", async ({
    page,
  }) => {
    await page.goto("https://the-internet.herokuapp.com/upload");
    await page.waitForLoadState("domcontentloaded");
    // Creamos un archivo en data con nombre demo-upload.txt.
    const filePath = path.join(process.cwd(), "data", "demo-upload.txt");
    // input type="file" tiene id="file-upload"
    await page.setInputFiles("#file-upload", filePath);
    // botón "Upload"
    await page.click("#file-submit");
    //WaitForSelector
    await page.waitForSelector("#uploaded-files", {
      state: "visible",
      timeout: 5000,
    });
    //WaitForState
    //await page.locator("uploaded-files").waitFor({state:"visible"})
    await expect(page.locator("#uploaded-files")).toHaveText("demo-upload.txt");
  });
});

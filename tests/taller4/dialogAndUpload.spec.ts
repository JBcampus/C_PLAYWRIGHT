import { expect, test } from "@playwright/test";
import * as path from "node:path";
test.describe("Taller 4 - Diálogos JS y Upload de archivos", () => {
  test.beforeEach(async () => {
    console.log("Iniciando test");
  });
  test.afterEach(async () => {
    console.log("Iniciando test");
  });

  test("Capturar alert/confirm/prompt", async ({ page }) => {
    await page.goto("https://the-internet.herokuapp.com/javascript_alerts");
    await page.waitForLoadState("domcontentloaded");
    // Escuchamos cualquier diálogo JS que aparezca
    page.on("dialog", async (dialog) => {
      console.log(`Dialog detectado: ${dialog.type()} |
    ${dialog.message()}`);
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
    await page.click("text=Click for JS Alert");
    await expect(page.locator("#result")).toHaveText("You successfully clicked an alert");
    // 2. Confirm
    await page.click("text=Click for JS Confirm");
    // Como hicimos dismiss() arriba, la página mostrará "Youclicked: Cancel" await expect(page.locator("#result")).toHaveText("You clicked:Cancel");
    // 3. Prompt
    await page.click("text=Click for JS Prompt");
    // Aceptamos con 'Hola desde Playwright'
    await expect(page.locator("#result")).toHaveText("You entered: Hola desde Playwright");
  });

  test("Subida de archivo (file upload)", async ({ page }) => {
    await page.goto("https://the-internet.herokuapp.com/upload");
    await page.waitForLoadState("domcontentloaded");
    // Creamos un archivo en data con nombre demo-upload.txt.
    const filePath = path.join(process.cwd(), "data", "demo-upload.txt");
    // input type="file" tiene id="file-upload"
    await page.setInputFiles("#file-upload", filePath);
    // botón "Upload"
    await page.click("#file-submit");
    //WaitForSelector
    await page.waitForSelector("#uploaded-files", { state: "visible", timeout: 5000 });
    //WaitForState
    //await page.locator("uploaded-files").waitFor({state:"visible"})
    await expect(page.locator("#uploaded-files")).toHaveText("demo-upload.txt");
  });
});
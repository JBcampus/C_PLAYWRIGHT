import { expect, test } from "@playwright/test";
import { JsAlertsPage } from "../../pages/jsAlerts.page";
import { dataFilePath } from "../../helpers/utils/upload.helper";
test.describe("Taller 5 - Diálogos JS y Upload de archivos(REFACT)", () => {test.beforeEach(async () => {console.log("[TEST] Iniciando test");
});
test.afterEach(async () => {
console.log("[TEST] Finalizando test");
});
test("Capturar alert/confirm/prompt", async ({ page }) => {
const alerts = new JsAlertsPage(page);

await alerts.goto();

await alerts.dialogHanler({promptText: "Hola desde Playwright",confirmAction: "dismiss",log: true}); 

await alerts.clickAlert();
await alerts.expectResult("You successfully clicked an alert");

await alerts.clickConfirm();
await alerts.expectResult("You clicked: Cancel");

await alerts.clickPrompt();
await alerts.expectResult(/You entered:/);
});
test("Subida de archivo (file upload)", async ({ page }) => {
await page.goto("https://the-internet.herokuapp.com/upload");
const filePath = dataFilePath("demo-upload.txt");
await page.locator("#file-upload").setInputFiles(filePath);
await page.locator("#file-submit").click();
await expect(page.locator("#uploaded-files")).toHaveText("demo-upload.txt");
});
});
import { test, expect } from "@playwright/test";
import * as fs from "fs";
import * as path from "path";
import PDFDocument from "pdfkit";
import { LoginPage } from "../../pages/tarea2/login.page";
import { InventoryPage } from "../../pages/tarea2/inventory.page";
import { CheckoutPage } from "../../pages/tarea2/checkout.page";

test.describe("Taller 2 - Flujo de compra completo en SauceDemo", () => {
  let loginPage: LoginPage;
  let inventoryPage: InventoryPage;
  let checkoutPage: CheckoutPage;
  const screenshots: string[] = [];

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    inventoryPage = new InventoryPage(page);
    checkoutPage = new CheckoutPage(page);
    screenshots.length = 0; // Limpiar array antes de cada test
  });

  test("Simular flujo de compras exitoso", async ({ page }) => {
    // Asegurar que la carpeta reports existe
    const reportsDir = path.join(process.cwd(), "reports");
    if (!fs.existsSync(reportsDir)) {
      fs.mkdirSync(reportsDir, { recursive: true });
    }

    // 1. Navegar y Autenticarse
    await loginPage.navigate();
    await loginPage.login("standard_user", "secret_sauce");
    const ss1 = path.join(reportsDir, "step1-login.png");
    await page.screenshot({ path: ss1, fullPage: true });
    screenshots.push(ss1);

    // 2. Validar inventario y productos
    await inventoryPage.validateInventoryPage();
    await inventoryPage.addThreeProducts();
    await inventoryPage.goToCart("3");
    const ss2 = path.join(reportsDir, "step2-cart.png");
    await page.screenshot({ path: ss2, fullPage: true });
    screenshots.push(ss2);

    // 3. Iniciar Checkout
    await checkoutPage.clickCheckout();
    const ss3 = path.join(reportsDir, "step3-checkout-form.png");
    await page.screenshot({ path: ss3, fullPage: true });
    screenshots.push(ss3);

    // 4. Llenar formulario y continuar
    await checkoutPage.fillInformationAndContinue("Juan", "Pérez", "15001");
    const ss4 = path.join(reportsDir, "step4-overview.png");
    await page.screenshot({ path: ss4, fullPage: true });
    screenshots.push(ss4);

    // 5. Finalizar compra y validar mensaje de éxito
    await checkoutPage.finishCheckout();
    await checkoutPage.validateCompleteOrder();
    const ss5 = path.join(reportsDir, "step5-complete.png");
    await page.screenshot({ path: ss5, fullPage: true });
    screenshots.push(ss5);

    // --- GENERACIÓN DEL PDF ---
    const pdfPath = path.join(reportsDir, "tarea2-evidencias.pdf");
    const doc = new PDFDocument({ margin: 30, size: "A4" });
    const stream = fs.createWriteStream(pdfPath);
    doc.pipe(stream);

    // Título del reporte PDF
    doc.fontSize(16).text("Reporte de Evidencias - Taller 2 (SauceDemo)", {
      align: "center",
    });
    doc.moveDown(1);

    // Insertar cada captura de pantalla en el PDF
    for (let i = 0; i < screenshots.length; i++) {
      if (i > 0) doc.addPage();
      doc.fontSize(12).text(`Paso ${i + 1}: Evidencia de ejecución`);
      doc.moveDown(0.5);
      doc.image(screenshots[i], {
        fit: [500, 400],
        align: "center",
        valign: "center",
      });
    }

    doc.end();
    await new Promise((resolve) => stream.on("finish", resolve));
    console.log(`PDF de evidencias generado exitosamente en: ${pdfPath}`);
  });
});

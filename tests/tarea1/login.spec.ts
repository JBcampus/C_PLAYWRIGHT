import { test, expect } from "@playwright/test";
import * as fs from "fs";
import * as path from "path";

test.describe("Suite 1: Flujo de Login y Validación en Practice ExpandTesting", () => {
  const screenshots: { title: string; path: string }[] = [];
  const dir = path.join("reports", "screenshots");

  test.beforeAll(() => {
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
  });

  test("Test 1: Autenticación correcta", async ({ page }) => {
    console.log("Iniciando Test 1: Autenticación correcta...");
    await page.goto("https://practice.expandtesting.com/");

    // Captura 1: Botón de login en el home
    const tryItOutButton = page.locator('a[href="/login"]', {
      hasText: "Try it out",
    });
    await tryItOutButton.waitFor();
    const img1 = path.join(dir, "1-home-login-card.png");
    await tryItOutButton.screenshot({ path: img1 });
    screenshots.push({
      title: "1. Selección de Test Login Page en el Home",
      path: img1,
    });

    await tryItOutButton.click();

    // Captura 2: Formulario de login vacío
    const loginForm = page.locator("form");
    await loginForm.waitFor();
    const img2 = path.join(dir, "2-login-form.png");
    await loginForm.screenshot({ path: img2 });
    screenshots.push({ title: "2. Formulario de Login (Vacío)", path: img2 });

    // Ingresar credenciales correctas
    await page.locator("input#username").fill("practice");
    await page.locator("input#password").fill("SuperSecretPassword!");

    // NUEVA CAPTURA: Formulario con username y password ingresados (Test 1)
    const imgFilled1 = path.join(dir, "2b-login-form-filled.png");
    await loginForm.screenshot({ path: imgFilled1 });
    screenshots.push({
      title: "3. Formulario con Credenciales Ingresadas (Test 1 Correcto)",
      path: imgFilled1,
    });

    await page.click('button[type="submit"]');

    // Captura: Área segura filtrando exactamente por el mensaje de éxito
    const secureArea = page
      .locator(".container")
      .filter({ hasText: "You logged into a secure area!" })
      .first();
    await secureArea.waitFor();
    const img3 = path.join(dir, "3-success-secure.png");
    await secureArea.screenshot({ path: img3 });
    screenshots.push({
      title: "4. Resultado Test 1: Redirección al Área Segura (Éxito)",
      path: img3,
    });

    await expect(page).toHaveURL(/.*secure/);
  });

  test("Test 2: Autenticación incorrecta", async ({ page }) => {
    console.log("Iniciando Test 2: Autenticación incorrecta...");
    await page.goto("https://practice.expandtesting.com/");

    const tryItOutButton2 = page.locator('a[href="/login"]', {
      hasText: "Try it out",
    });
    await tryItOutButton2.click();

    const loginForm2 = page.locator("form");
    await loginForm2.waitFor();

    // Ingresar credenciales incorrectas
    await page.locator("input#username").fill("usuario_falso");
    await page.locator("input#password").fill("password_falso");

    // NUEVA CAPTURA: Formulario con username y password incorrectos ingresados (Test 2)
    const imgFilled2 = path.join(dir, "4-login-form-incorrect-filled.png");
    await loginForm2.screenshot({ path: imgFilled2 });
    screenshots.push({
      title: "5. Formulario con Credenciales Incorrectas Ingresadas (Test 2)",
      path: imgFilled2,
    });

    await page.click('button[type="submit"]');

    // Captura: Contenedor filtrando exactamente por el mensaje de error de credenciales
    const errorForm = page
      .locator(".container")
      .filter({ hasText: "Your username is invalid!" })
      .first();
    await errorForm.waitFor();
    const img4 = path.join(dir, "5-error-login.png");
    await errorForm.screenshot({ path: img4 });
    screenshots.push({
      title: "6. Resultado Test 2: Mensaje de Error en el Login",
      path: img4,
    });

    await expect(page).toHaveURL(/.*login/);

    // ==========================================
    // GENERACIÓN AUTOMÁTICA DEL PDF
    // ==========================================
    console.log("Generando documento PDF con las evidencias estructuradas...");

    let htmlContent = `
      <html>
        <head>
          <meta charset="utf-8">
          <style>
            body { font-family: Arial, sans-serif; margin: 20px; color: #333; background-color: #ffffff; }
            h1 { text-align: center; color: #1a73e8; font-size: 22px; margin-bottom: 5px; }
            .subtitle { text-align: center; color: #666; font-size: 13px; margin-bottom: 20px; }
            .card { 
              background: #fff; 
              margin-bottom: 20px; 
              border: 1px solid #e0e0e0; 
              padding: 12px; 
              border-radius: 6px; 
              page-break-inside: avoid; 
              box-shadow: 0 1px 3px rgba(0,0,0,0.05);
            }
            h3 { margin-top: 0; font-size: 14px; color: #202124; border-bottom: 2px solid #1a73e8; padding-bottom: 4px; }
            .image-container { text-align: center; margin-top: 8px; }
            img { 
              max-width: 80%; 
              max-height: 320px; 
              height: auto; 
              border: 1px solid #ccc; 
              border-radius: 4px; 
            }
          </style>
        </head>
        <body>
          <h1>Reporte de Automatización - Tarea 1</h1>
          <div class="subtitle">Curso Playwright | Flujo de Login y Validación</div>
    `;

    for (const item of screenshots) {
      if (fs.existsSync(item.path)) {
        const bitmap = fs.readFileSync(item.path);
        const base64Str = bitmap.toString("base64");
        htmlContent += `
          <div class="card">
            <h3>${item.title}</h3>
            <div class="image-container">
              <img src="data:image/png;base64,${base64Str}" />
            </div>
          </div>
        `;
      }
    }

    htmlContent += `</body></html>`;

    const htmlPath = path.join("reports", "reporte-temp.html");
    fs.writeFileSync(htmlPath, htmlContent);

    const pdfOutputDir = path.join("reports");
    if (!fs.existsSync(pdfOutputDir)) {
      fs.mkdirSync(pdfOutputDir, { recursive: true });
    }

    const finalPdfPath = path.join(pdfOutputDir, "tarea1-evidencias.pdf");
    await page.goto(`file://${path.resolve(htmlPath)}`);
    await page.pdf({
      path: finalPdfPath,
      format: "A4",
      printBackground: true,
      margin: { top: "15px", bottom: "15px", left: "15px", right: "15px" },
    });

    console.log(
      `¡PDF generado con éxito y perfectamente estructurado en: ${finalPdfPath}!`,
    );
  });
});

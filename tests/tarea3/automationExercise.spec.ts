import { expect, test } from "@playwright/test";
import { tarea3DataFilePath } from "../../helpers/tarea3/automationExercise.helper.js";
import { AutomationExercisePage } from "../../pages/tarea2/AutomationExercisePage.js";

test.describe("Tarea 3 - Contacto y flujo de compra", () => {
  test("Suite 1 - Test 1: completa y envía el formulario de contacto", async ({
    page,
  }, testInfo) => {
    const automationExercise = new AutomationExercisePage(page);

    await test.step("Navegar al sitio y cerrar el anuncio inicial si aparece", async () => {
      await automationExercise.open();
    });

    await test.step("Abrir la página Contact us", async () => {
      await automationExercise.openContactUs();
      await page.screenshot({
        path: testInfo.outputPath("01-contact-form-before-upload.png"),
        fullPage: true,
      });
    });

    await test.step("Completar el formulario y adjuntar el archivo de datos", async () => {
      await automationExercise.completeContactForm(
        "Alex QA",
        "alex.qa@example.com",
        "Consulta de prueba",
        "Mensaje ficticio para validar el formulario de contacto.",
        tarea3DataFilePath("demo-upload.txt"),
      );
      await automationExercise.expectSelectedFile("demo-upload.txt");
    });

    await test.step("Capturar el archivo adjunto antes de confirmar el envío", async () => {
      await page.screenshot({
        path: testInfo.outputPath("02-contact-form-file-attached.png"),
        fullPage: true,
      });
    });

    await test.step("Enviar el formulario y aceptar el diálogo JavaScript", async () => {
      await automationExercise.submitContactForm();
    });

    await test.step("Validar el mensaje de éxito y regresar a Home", async () => {
      await automationExercise.expectContactSuccess();
      await page.screenshot({
        path: testInfo.outputPath("03-contact-form-success.png"),
        fullPage: true,
      });
      await automationExercise.returnHome();
      await expect(page).toHaveURL("https://automationexercise.com/");
    });
  });

  test("Suite 1 - Test 2: agrega un producto Polo al carrito e inicia checkout", async ({
    page,
  }, testInfo) => {
    const automationExercise = new AutomationExercisePage(page);

    await test.step("Navegar al sitio y cerrar el anuncio inicial si aparece", async () => {
      await automationExercise.open();
      await page.screenshot({
        path: testInfo.outputPath("home-shopping.png"),
        fullPage: true,
      });
    });

    await test.step("Abrir la marca Polo y validar la URL", async () => {
      await automationExercise.openPoloProducts();
      await page.screenshot({
        path: testInfo.outputPath("polo-products.png"),
        fullPage: true,
      });
    });

    let productName = "";
    await test.step("Agregar al carrito el primer producto Polo y abrir View Cart", async () => {
      productName = await automationExercise.firstPoloProductName();
      await automationExercise.addFirstPoloProductAndOpenCart();
      await page.screenshot({
        path: testInfo.outputPath("polo-cart.png"),
        fullPage: true,
      });
    });

    await test.step("Validar que el producto seleccionado esté visible en el carrito", async () => {
      await automationExercise.expectProductInCart(productName);
    });

    await test.step("Presionar Proceed To Checkout", async () => {
      await automationExercise.proceedToCheckout();
      await page.screenshot({
        path: testInfo.outputPath("checkout-started.png"),
        fullPage: true,
      });
    });
  });
});

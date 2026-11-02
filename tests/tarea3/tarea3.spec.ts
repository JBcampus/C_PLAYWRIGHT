import { test, expect } from "@playwright/test";

import { ContactPage } from "../../pages/tarea3/ContactPage";
import { ProductsPage } from "../../pages/tarea3/ProductsPage";

import { testData } from "../../helpers/tarea3/testData";

import { getTxtFilePath } from "../../helpers/tarea3/fileHelper";

import { saveEvidence } from "../../helpers/tarea3/evidenceHelper";

/**
 * Suite de pruebas de contacto y compra en Automation Exercise.
 */
test.describe("Tarea 03 - Automation Exercise", () => {
  /**
   * Test 1: Automatización del formulario de contacto
   */
  test("Test 1 - Enviar formulario de contacto", async ({ page }) => {
    const contactPage = new ContactPage(page);

    await test.step("Paso 1: Navegar a Automation Exercise", async () => {
      await contactPage.navigate();

      await expect(page).toHaveURL("https://automationexercise.com/");
    });

    await test.step("Paso 2: Ingresar a Contact us", async () => {
      await contactPage.openContactUs();
    });

    await test.step("Paso 3: Completar formulario con datos ficticios", async () => {
      await contactPage.fillForm(
        testData.contact.name,
        testData.contact.email,
        testData.contact.subject,
        testData.contact.message,
      );
    });

    await test.step("Paso 4: Seleccionar archivo TXT", async () => {
      const filePath = await getTxtFilePath();

      await contactPage.uploadFile(filePath);

      await contactPage.verifyFileUploaded();
    });

    await test.step("Paso 5: Guardar evidencia del formulario", async () => {
      await saveEvidence(page, "01-formulario-contacto.png");
    });

    await test.step("Paso 6: Enviar formulario y aceptar diálogo JS", async () => {
      await contactPage.submitAndAcceptDialog();
    });

    await test.step("Paso 7: Validar mensaje de envío exitoso", async () => {
      await contactPage.verifySuccessMessage();

      await saveEvidence(page, "02-formulario-enviado.png");
    });

    await test.step("Paso 8: Presionar Home", async () => {
      await contactPage.goHome();

      await expect(page).toHaveURL("https://automationexercise.com/");

      await saveEvidence(page, "03-home.png");
    });
  });

  /**
   * Test 2: Automatización del flujo de compra.
   */
  test("Test 2 - Agregar producto POLO al carrito", async ({ page }) => {
    const productsPage = new ProductsPage(page);

    let selectedProduct = "";

    await test.step("Paso 1: Navegar a Automation Exercise", async () => {
      await productsPage.navigate();

      await expect(page).toHaveURL("https://automationexercise.com/");
    });

    await test.step("Paso 2: Seleccionar la marca POLO", async () => {
      await productsPage.selectPoloBrand();
    });

    await test.step("Paso 3: Validar URL de la marca POLO", async () => {
      await productsPage.verifyPoloUrl();

      await saveEvidence(page, "04-productos-polo.png");
    });

    await test.step("Paso 4: Agregar el primer producto al carrito", async () => {
      selectedProduct = await productsPage.addFirstProductToCart();
    });

    await test.step("Paso 5: Validar View Cart e ingresar al carrito", async () => {
      await productsPage.openCart();

      await expect(page).toHaveURL(/view_cart/);

      await saveEvidence(page, "05-carrito-compras.png");
    });

    await test.step("Paso 6: Validar que el producto esté visible", async () => {
      await productsPage.verifyProductInCart(selectedProduct);
    });

    await test.step("Paso 7: Presionar Proceed To Checkout", async () => {
      await productsPage.proceedToCheckout();

      await saveEvidence(page, "06-checkout.png");
    });
  });
});
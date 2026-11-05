import { test, expect } from '@playwright/test';
import { ContactPage } from '../../pages/tarea2/contact.page';
import { ShopPage } from '../../pages/tarea2/shop.page';
import { contactData, contactFilePath } from '../../helpers/tarea3/test-data';

 test.describe('Tarea 03 - Playwright', () => {
  test('Test 1 - Completar y enviar formulario de contacto con archivo', async ({ page }) => {
    const contactPage = new ContactPage(page);

    await test.step('Abrir Contact us', async () => {
      await contactPage.openContactForm();
      await page.screenshot({ path: 'test-results/tarea3-01-contacto.png', fullPage: true });
    });

    await test.step('Completar el formulario con datos ficticios', async () => {
      await contactPage.fillContactForm(contactData);
    });

    await test.step('Adjuntar el archivo TXT y validar que esté seleccionado', async () => {
      await contactPage.uploadFile(contactFilePath);
      await page.screenshot({ path: 'test-results/tarea3-02-archivo-cargado.png', fullPage: true });
    });

    await test.step('Enviar el formulario y aceptar el diálogo JavaScript', async () => {
      await contactPage.submitAndAcceptDialog();
    });

    await test.step('Validar el mensaje de éxito y regresar a Home', async () => {
      await contactPage.verifySuccessAndGoHome();
      await page.screenshot({ path: 'test-results/tarea3-03-contacto-exitoso.png', fullPage: true });
    });
  });

  test('Test 2 - Agregar el primer producto de la marca Polo al carrito', async ({ page }) => {
    const shopPage = new ShopPage(page);
    let selectedProduct = '';

    await test.step('Navegar a la página principal y seleccionar la marca POLO', async () => {
      await shopPage.openPoloBrand();
      await page.screenshot({ path: 'test-results/tarea3-04-marca-polo.png', fullPage: true });
    });

    await test.step('Agregar al carrito el primer producto', async () => {
      selectedProduct = await shopPage.addFirstProductToCart();
      await page.screenshot({ path: 'test-results/tarea3-05-producto-agregado.png', fullPage: true });
    });

    await test.step('Validar View Cart y abrir el carrito', async () => {
      await shopPage.openCartFromModal();
      await page.screenshot({ path: 'test-results/tarea3-06-carrito.png', fullPage: true });
    });

    await test.step('Validar que el producto seleccionado esté en el carrito', async () => {
      await shopPage.verifyProductInCart(selectedProduct);
    });

    await test.step('Presionar Proceed To Checkout', async () => {
      await shopPage.proceedToCheckout();
      await page.screenshot({ path: 'test-results/tarea3-07-checkout.png', fullPage: true });
    });
  });
});

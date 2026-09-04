import { test, expect } from '@playwright/test';
import { ContactPage } from '../../pages/tarea2/ContactPage';
import { ProductsPage } from '../../pages/tarea2/ProductsPage';
import { getFilePath } from '../../helpers/tarea3/fileHelper';

test.describe('Suite 1: Pruebas de Contacto y Compra en AutomationExercise', () => {

  test('Test 1: Flujo de formulario de contacto con carga de archivo', async ({ page }) => {
    const contactPage = new ContactPage(page);
    const filePath = getFilePath('archivo.txt');

    await test.step('Navegar a la página principal', async () => {
      await page.goto('https://automationexercise.com/');
    });

    await test.step('Ubicar botón "Contact us" y hacer click', async () => {
      await contactPage.navigateToContactUs();
    });

    await test.step('Completar formulario con datos ficticios', async () => {
      await contactPage.fillContactForm(
        'Juan Pérez',
        'juan.perez@test.com',
        'Consulta de prueba',
        'Mensaje de prueba para automatización de formulario.'
      );
    });

    await test.step('Seleccionar el archivo txt de la ruta data y validar carga', async () => {
      await contactPage.uploadFile(filePath);
      await expect(contactPage.fileInput).toHaveValue(/archivo\.txt/);     
    });

    await test.step('Enviar formulario y confirmar el diálogo de alerta JS', async () => {
      await contactPage.submitFormWithDialogHandling();
    });

    await test.step('Validar mensaje de éxito de envío', async () => {
      await expect(contactPage.successAlert).toContainText(
        'Success! Your details have been submitted successfully.'
      );
    });

    await test.step('Presionar "Home"', async () => {
      await contactPage.goHome();
      await expect(page).toHaveURL('https://automationexercise.com/');
    });
  });

  test('Test 2: Flujo de selección de producto y checkout', async ({ page }) => {
    const productsPage = new ProductsPage(page);

    await test.step('Navegar a la página principal', async () => {
      await page.goto('https://automationexercise.com/');
    });

    await test.step('Ubicar botón "POLO" y dar click', async () => {
      await productsPage.selectPoloBrand();
    });

    await test.step('Validar que la URL contenga "/brand_products/Polo"', async () => {
      await expect(page).toHaveURL(/\/brand_products\/Polo/);
    });

    await test.step('Dar click en "Add to cart" al primer elemento', async () => {
      await productsPage.addFirstProductToCart();
    });

    await test.step('Buscar el botón "View Cart", validar visibilidad y dar click', async () => {
      await expect(productsPage.viewCartModalBtn).toBeVisible();
      await productsPage.goToCartFromModal();
    });

    await test.step('Buscar selector con el nombre del producto seleccionado y validar visibilidad', async () => {
      await expect(productsPage.productNameInCart).toBeVisible();
    });

    await test.step('Dar click en "Proceed to Checkout"', async () => {
      await productsPage.proceedToCheckout();
    });
  });

});
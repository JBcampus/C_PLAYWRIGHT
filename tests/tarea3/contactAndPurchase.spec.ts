import { test, expect } from '@playwright/test';
import { HomePage } from '../../pages/tarea2/homePage';
import { ContactUsPage } from '../../pages/tarea2/contactUsPage';
import { CartPage } from '../../pages/tarea2/cartPage';
import { UploadHelper } from '../../helpers/tarea3/uploadHelper';

test.describe('Suite 1: Validaciones de Formulario de Contacto y Flujo de Compra', () => {


    test('Test 1: Flujo de Llenado de Formulario y Carga de Archivo', async ({ page }) => {
        const homePage = new HomePage(page);
        const contactPage = new ContactUsPage(page);
        const uploadHelper = new UploadHelper(page);

        await test.step('Navegar a la página principal', async () => {
            await homePage.navigateToHome();
        });

        await test.step('Ubicar el boton "Contact Us" y dar click', async () => {
            await homePage.clickContactUs();
        });

        await test.step('Completar el formulario de contacto con datos ficticios', async () => {
            await contactPage.fillForm(
                'Juan Pérez',
                'juan.perez@example.com',
                'Consulta de Soporte Técnico',
                'Este es un mensaje de prueba automatizado para validar el flujo del formulario.'
            );
        });

        await test.step('Cargar el archivo txt desde el directorio data', async () => {
            const selector = contactPage.getFileSelector();
            await uploadHelper.uploadDataFile(selector, 'demo-upload.txt');
        });

        await test.step('Validar que se haya cargado archivo', async () => {
            await contactPage.verifyFileIsLoaded();
        });
        
        await test.step('Enviar el formulario aceptando el diálogo de confirmación de JS', async () => {
            await contactPage.submitFormWithDialog();
        });
        
        await test.step('Validar mensaje exitoso de envío', async () => {
            await contactPage.verifySuccessMessage();
        });

        await test.step('Retornar a la página de inicio', async () => {
            await contactPage.clickHome();
            await expect(page).toHaveURL('https://automationexercise.com');
        });
    });

        test('Test 2: Flujo de Compra de Producto Filtrado por Marca', async ({ page }) => {
        const homePage = new HomePage(page);
        const cartPage = new CartPage(page);
        let productoSeleccionado = ''; // Variable para almacenar el nombre real

        await test.step('Navegar a la página principal', async () => {
            await homePage.navigateToHome();
        });

        await test.step('Validar que "Feature Items" esté disponible', async () => {
            await homePage.verifyFeaturesItemsVisible();
        });

        await test.step('Buscar y seleccionar el botón de la marca "POLO"', async () => {
            await homePage.clickPoloBrand();
        });

           if (page.url().includes('#google_vignette')) {
                await page.goto('https://automationexercise.combrand_products/Polo');
            }
        

        await test.step('Validar que la Url contenga “/Polo/”', async () => {
            await expect(page).toHaveURL(/.*\/brand_products\/Polo/);
        });

        await test.step('Dar click en “Addtocart” al primer elemento', async () => {
            // Guardamos el nombre dinámicamente del primer item que aparezca
            productoSeleccionado = await cartPage.getFirstProductName();
            console.log(`Producto detectado en catálogo: ${productoSeleccionado}`);
            
            await cartPage.addFirstProductToCart();
        });

        await test.step('Buscar el boton “ViewCart” y validar que sea visible, luego dar click en él ', async () => {
            await cartPage.verifyAndClickViewCart();
        });

        await test.step('Validar que el producto seleccionado se encuentre en el listado', async () => {
            // Evaluamos usando el nombre real capturado dinámicamente
            await cartPage.verifyProductInCart(productoSeleccionado);
        });

        await test.step('Dar click en “ProceedtoCheckout” ', async () => {
            await cartPage.clickProceedToCheckout();
        });
    });

});

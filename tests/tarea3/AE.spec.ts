import test, { expect } from "@playwright/test";
import { dataFilePath } from "../../helpers/tarea3/AU_upload.helper";
import { AE_ContactUs_Page } from "../../pages/tarea3/AE_ContactUs.page";
import { AE_Home_Page } from "../../pages/tarea3/AE_Home.page";
import { AE_Brand_Page } from "../../pages/tarea3/AE_Brand.page";
import { AE_ViewCart_Page } from "../../pages/tarea3/AE_ViewCart.page";

/** Casos E2E del sitio Automation Exercise. */
test.describe("Automation Exercise", () => {
  /** Registra el inicio de la suite. */
  test.beforeAll(async () => {
    console.log("[SUITE] Inicializando Suite de Automation Exercise");
  });

  /** Registra el cierre de la suite. */
  test.afterAll(async () => {
    console.log("[SUITE] Finalizando Suite de Automation Exercise");
  });

  /** Registra el inicio de cada caso de prueba. */
  test.beforeEach(async () => {
    console.log("[TEST] Inicializando test");
  });

  /** Registra el cierre de cada caso de prueba. */
  test.afterEach(async () => {
    console.log("[TEST] Finalizando test");
  });

  /** Verifica el envio exitoso del formulario Contact Us con un archivo adjunto. */
  test("Suite 1 - Test 1: Contact Us exitoso", async ({ page }) => {
    const homePage = new AE_Home_Page(page);
    const contactUsPage = new AE_ContactUs_Page(page);

    //Paso 1: Navegar a la pagina: automationexercise.com
    await test.step("Paso 1: Abrir página inicial", async () => {
      await homePage.gotoHome();
      await expect(page).toHaveTitle(/Automation Exercise/);
    });

    //Paso 2: Ubicar botón “Contact us" y hacer click
    await test.step("Paso 2: Ubicar botón 'Contact us' y hacer click", async () => {
      await homePage.clickContactUs();
    });

    //Paso 3: Completar formulario con datos ficticios
    await test.step("Paso 3: Completar formulario", async () => {
      await contactUsPage.completarFormulario();
    });

    //Paso 4: Selecciona el archivo txt usado en el ultimo taller ubicado en la ruta “data”.
    await test.step("Paso 4: Seleccionar archivo", async () => {
      await page.waitForLoadState("domcontentloaded");
      const filePath = dataFilePath("demo-upload.txt");
      //const filePath = path.join(process.cwd(), "data", "demo-upload.txt");
      await page.setInputFiles("input[name='upload_file']", filePath);
    });

    //Paso 5: Validar que se haya cargado el archivo.
    await test.step("Paso 5: Validar carga de archivo", async () => {
      await contactUsPage.expectUploadedFileName("demo-upload.txt");
    });

    //Paso 6: Enviar formulario y aceptar el dialogo JS.
    await test.step("Paso 6: Enviar formulario", async () => {
      await contactUsPage.dialogHanler({
        promptText: "Hola desde Playwright",
        confirmAction: "accept", //"accept":OK ; dismiss:Cancel
        log: true,
      });

      await contactUsPage.clickBtnSubmit();
    });

    //Paso 7: Validar mensaje de éxito de envío.
    await test.step("Paso 7: Validar mensaje de éxito", async () => {
      await contactUsPage.expectResult();
    });

    //Paso 8: Presionar “Home”
    await test.step("Paso 8: Ir a la página de inicio", async () => {
      await contactUsPage.clickBtnHome();
    });
  });

  /** Verifica que un producto Polo pueda agregarse al carrito y enviarse al checkout. */
  test("Suite 1 - Test 2: Compra Polo exitoso", async ({ page }) => {
    const homePage = new AE_Home_Page(page);
    const brandPage = new AE_Brand_Page(page);
    const viewCartPage = new AE_ViewCart_Page(page);

    //Paso 1: Navegar a la pagina https://automationexercise.com/.
    await test.step("Paso 1: Navegar a la pagina principaly validar Feature Items", async () => {
      await homePage.gotoHome();
      await homePage.expectFeatureItems();
    });

    //Paso 2: Ubicar botón “POLO” y dar click.
    await test.step("Paso 2: Ubicar botón 'POLO' en sección BRANDS y dar click", async () => {
      await homePage.clickBrandPolo();
    });

    //Paso 3: Validar que la url contenga “/Polo/”
    await test.step("Paso 3: Validar que la url contenga '/Polo/'", async () => {
      await homePage.expectPoloURL();
    });

    //Paso 4: Dar click en “Add to cart” al primer elemento
    await test.step("Paso 4: Dar click en 'Add to cart' al primer elemento", async () => {
      await brandPage.clickAddToCart();
    });

    //Paso 5: Buscar el boton “View Cart” y validar que sea visible, luego dar click en “View Cart”.
    await test.step("Paso 5: Validar que sea visible 'View Cart'", async () => {
      await brandPage.expectViewCartVisible();
    });

    //Paso 6: Click en “View Cart”.
    await test.step("Paso 6: Click en 'View Cart'", async () => {
      await brandPage.clickViewCart();
      await viewCartPage.expectViewCartURL();
    });

    //Paso 7: Buscar selector con el nombre del producto seleccionado y validar que sea visible
    await test.step("Paso 7: Buscar producto seleccionado y validar visibilidad", async () => {
      await viewCartPage.expectProductNameVisible();
    });

    //Paso 9: Dar click en “Proceed to Checkout”
    await test.step("Paso 8: Dar click en 'Proceed to Checkout'", async () => {
      await viewCartPage.clickProceedToCheckout();
    });
  });
});

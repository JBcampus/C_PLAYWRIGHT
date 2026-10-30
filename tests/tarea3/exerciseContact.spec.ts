import { test, expect } from "@playwright/test";
import { HomePage } from "../../pages/tarea3/home.page";
import { ContactPage } from "../../pages/tarea3/contact.page";
import { BrandPage } from "../../pages/tarea3/brand.page";

test.describe("Taller 3 - Automatización en AutomationExercise", () => {
  let homePage: HomePage;
  let contactPage: ContactPage;
  let brandPage: BrandPage;

  test.beforeEach(async ({ page }) => {
    homePage = new HomePage(page);
    contactPage = new ContactPage(page);
    brandPage = new BrandPage(page);
  });

  test("Suite 1 - Test 1: Flujo de Contact Us y Subida de Archivo", async ({
    page,
  }) => {
    await test.step("Navegar a la página principal", async () => {
      await homePage.navigate();
    });

    await test.step("Ubicar botón Contact Us y hacer clic", async () => {
      await homePage.clickContactUs();
    });

    await test.step("Completar formulario con datos ficticios y adjuntar archivo", async () => {
      await contactPage.fillContactForm(
        "Carlos Mendoza",
        "carlos.mendoza@test.com",
        "Sugerencia",
        "Excelente plataforma.",
      );
      await contactPage.uploadFile();
    });

    await test.step("Enviar formulario y aceptar diálogo", async () => {
      page.once("dialog", async (dialog) => {
        await dialog.accept();
      });
      await contactPage.submitForm();
      await page.waitForTimeout(1500); // Pausa de estabilización tras el alert
    });

    await test.step("Validar mensaje de éxito", async () => {
      const successAlert = page.locator("div.status.alert.alert-success");
      await successAlert.waitFor({ state: "visible", timeout: 15000 });
      await expect(successAlert).toBeVisible();
      await expect(successAlert).toHaveText(
        "Success! Your details have been submitted successfully.",
      );
      await contactPage.clickHome();
    });
  });

  test("Suite 1 - Test 2: Filtrar por marca Polo, agregar al carrito y Checkout", async ({
    page,
  }) => {
    await test.step("Navegar a la página principal", async () => {
      await homePage.navigate();
    });

    await test.step("Ubicar botón POLO en Brands y hacer clic (con manejo de anuncios)", async () => {
      await homePage.clickBrandPolo();
      if (page.url().includes("google_vignette")) {
        await page.goBack();
        await homePage.clickBrandPolo();
      }
    });

    await test.step("Validar que la URL contenga Polo", async () => {
      await brandPage.validateBrandUrl();
    });

    await test.step("Agregar el primer producto al carrito", async () => {
      await brandPage.addFirstProductToCart();
    });

    await test.step("Visualizar el carrito y proceder al Checkout", async () => {
      await brandPage.clickViewCartModal();
      await brandPage.proceedToCheckout();
    });
  });
});

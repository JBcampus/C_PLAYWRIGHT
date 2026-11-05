import { expect, type Locator, type Page } from "@playwright/test";
import { dismissInitialAdvertisement } from "../../helpers/tarea3/automationExercise.helper.js";

const AUTOMATION_EXERCISE_URL = "https://automationexercise.com/";

/**
 * Page Object para los flujos de contacto y compra de Automation Exercise.
 */
export class AutomationExercisePage {
  private readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  /**
   * Abre la página de inicio y cierra el anuncio inicial si está presente.
   */
  async open(): Promise<void> {
    await this.page.goto(AUTOMATION_EXERCISE_URL);
    await dismissInitialAdvertisement(this.page);
  }

  /**
   * Navega a la página de contacto desde la barra principal.
   */
  async openContactUs(): Promise<void> {
    await this.page.getByRole("link", { name: "Contact us" }).click();
    await expect(this.page).toHaveURL(/\/contact_us$/);
  }

  /**
   * Completa el formulario de contacto y selecciona el archivo de prueba.
   * @param name - Nombre ficticio para el formulario.
   * @param email - Correo ficticio para el formulario.
   * @param subject - Asunto del mensaje.
   * @param message - Contenido del mensaje.
   * @param filePath - Ruta absoluta del archivo que se adjunta.
   */
  async completeContactForm(
    name: string,
    email: string,
    subject: string,
    message: string,
    filePath: string,
  ): Promise<void> {
    await this.page.locator("[data-qa='name']").fill(name);
    await this.page.locator("[data-qa='email']").fill(email);
    await this.page.locator("[data-qa='subject']").fill(subject);
    await this.page.locator("[data-qa='message']").fill(message);
    await this.page.locator("input[name='upload_file']").setInputFiles(filePath);
  }

  /**
   * Valida que el formulario muestre el nombre del archivo seleccionado.
   * @param fileName - Nombre esperado del archivo adjunto.
   */
  async expectSelectedFile(fileName: string): Promise<void> {
    await expect(this.page.locator("input[name='upload_file']")).toHaveValue(
      new RegExp(fileName.replace(/[.*+?^${}()|[\]\\]/g, "\\$&") + "$"),
    );
  }

  /**
   * Envía el formulario y acepta el diálogo JavaScript de confirmación si aparece.
   */
  async submitContactForm(): Promise<void> {
    this.page.once("dialog", async (dialog) => {
      await dialog.accept();
    });

    await this.page.locator("[data-qa='submit-button']").click();
  }

  /**
   * Verifica el mensaje de envío exitoso del formulario de contacto.
   */
  async expectContactSuccess(): Promise<void> {
    await expect(
      this.page.locator(".status.alert.alert-success"),
    ).toContainText("Success! Your details have been submitted successfully.");
  }

  /**
   * Regresa a la página de inicio desde el formulario de contacto.
   */
  async returnHome(): Promise<void> {
    await this.page.locator("a.btn-success").filter({ hasText: "Home" }).click();
    await expect(this.page).toHaveURL(AUTOMATION_EXERCISE_URL);
    await dismissInitialAdvertisement(this.page);
  }

  /**
   * Abre la lista de productos de la marca Polo.
   */
  async openPoloProducts(): Promise<void> {
    await this.page.getByRole("link", { name: "POLO" }).click();
    await expect(this.page).toHaveURL(/\/brand_products\/Polo\/?$/i);
  }

  /**
   * Agrega el primer producto de Polo al carrito y abre el carrito desde la confirmación.
   */
  async addFirstPoloProductAndOpenCart(): Promise<void> {
    const firstProduct = this.page.locator(".productinfo").first();
    await firstProduct.getByRole("link", { name: /add to cart/i }).click();
    await this.page.getByRole("link", { name: "View Cart" }).click();
    await expect(this.page).toHaveURL(/\/view_cart\/?$/);
  }

  /**
   * Devuelve el nombre del primer producto de la lista de Polo.
   * @returns Nombre visible del primer producto.
   */
  async firstPoloProductName(): Promise<string> {
    const productName = this.page.locator(".productinfo p").first();
    await expect(productName).toBeVisible();
    return (await productName.innerText()).trim();
  }

  /**
   * Verifica que el producto indicado esté visible en el carrito.
   * @param productName - Nombre del producto esperado.
   */
  async expectProductInCart(productName: string): Promise<void> {
    await expect(this.cartProduct(productName)).toBeVisible();
  }

  /**
   * Inicia el checkout desde el carrito.
   */
  async proceedToCheckout(): Promise<void> {
    await this.page.getByText("Proceed To Checkout", { exact: true }).click();
  }

  private cartProduct(productName: string): Locator {
    return this.page.locator("#cart_info").getByRole("row", {
      name: new RegExp(productName.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")),
    });
  }
}

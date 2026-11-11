import { mkdir } from "node:fs/promises";
import path from "node:path";
import { Page, Locator, expect } from "@playwright/test";
import { LoggerHelper } from "../../helpers/logger.helper";

/**
 * Page Object para la gestión del inventario, filtros, carrito y checkout en Swag Labs.
 */
export class InventoryPage {
  readonly page: Page;
  readonly sortDropdown: Locator;
  readonly inventoryItems: Locator;
  readonly cartBadge: Locator;
  readonly cartLink: Locator;
  readonly firstNameInput: Locator;
  readonly lastNameInput: Locator;
  readonly postalCodeInput: Locator;
  readonly continueButton: Locator;
  readonly finishButton: Locator;
  readonly successHeader: Locator;
  readonly backHomeButton: Locator;
  readonly menuButton: Locator;
  readonly logoutLink: Locator;

  constructor(page: Page) {
    this.page = page;
    this.sortDropdown = page.locator(".product_sort_container");
    this.inventoryItems = page.locator(".inventory_item");
    this.cartBadge = page.locator(".shopping_cart_badge");
    this.cartLink = page.locator(".shopping_cart_link");
    this.firstNameInput = page.locator("#first-name");
    this.lastNameInput = page.locator("#last-name");
    this.postalCodeInput = page.locator("#postal-code");
    this.continueButton = page.locator("#continue");
    this.finishButton = page.locator("#finish");
    this.successHeader = page.locator(".complete-header");
    this.backHomeButton = page.locator("#back-to-products");
    this.menuButton = page.locator("#react-burger-menu-btn");
    this.logoutLink = page.locator("#logout_sidebar_link");
  }

  /**
   * Ordena los productos del inventario usando el selector desplegable.
   * @param sortOption Opción de ordenamiento ('az', 'za', 'lohi', 'hilo').
   */
  async sortProducts(sortOption: "az" | "za" | "lohi" | "hilo"): Promise<void> {
    LoggerHelper.info(`Ordenando productos con la opción: ${sortOption}`);
    await this.sortDropdown.selectOption(sortOption);
  }

  /**
   * Agrega productos al carrito basándose en un array de índices (Data-Driven pick).
   * @param indices Array de índices numéricos de los productos a seleccionar.
   */
  async addProductsByIndex(
    indices: number[],
    captureEvidence = false,
  ): Promise<void> {
    LoggerHelper.info(
      `Agregando al carrito los productos en los índices: ${indices.join(", ")}`,
    );
    for (const index of indices) {
      const item = this.inventoryItems.nth(index);
      const addToCartBtn = item.locator('button[id^="add-to-cart"]');
      await addToCartBtn.click();
    }
    await this.captureEvidence(
      "2-suite2-01-productos-seleccionados.png",
      captureEvidence,
    );
  }

  /**
   * Valida que el número de productos en el badge del carrito coincida con el esperado.
   * @param expectedBadge Número esperado en el icono del carrito.
   */
  async validateCartBadge(
    expectedBadge: string,
    captureEvidence = false,
  ): Promise<void> {
    LoggerHelper.info(
      `Validando que el badge del carrito muestre: ${expectedBadge}`,
    );
    await expect(this.cartBadge).toHaveText(expectedBadge);
    await this.cartLink.click();
    await this.captureEvidence(
      "2-suite2-02-carrito-productos-elegidos.png",
      captureEvidence,
    );
  }

  /**
   * Realiza el flujo completo de checkout llenando el formulario con datos ficticios.
   */
  async completeCheckout(captureEvidence = false): Promise<void> {
    LoggerHelper.info("Iniciando proceso de checkout");
    await this.page.locator("#checkout").click();

    LoggerHelper.info("Llenando formulario de información de envío");
    await this.firstNameInput.fill("Carlos");
    await this.lastNameInput.fill("Mendoza");
    await this.postalCodeInput.fill("15001");
    await this.captureEvidence(
      "2-suite2-03-datos-cliente.png",
      captureEvidence,
    );
    await this.continueButton.click();
    await this.captureEvidence("2-suite2-04-checkout.png", captureEvidence);

    LoggerHelper.info("Finalizando orden de compra");
    await this.finishButton.click();
  }

  /**
   * Valida la compra exitosa y toma una captura de pantalla de evidencia.
   */
  async validateSuccessfulPurchase(captureEvidence = false): Promise<void> {
    LoggerHelper.info("Validando mensaje de compra exitosa");
    await expect(this.successHeader).toHaveText("Thank you for your order!");

    await this.captureEvidence(
      "2-suite2-05-compra-exitosa.png",
      captureEvidence,
    );
  }

  /**
   * Cierra sesión en la aplicación.
   */
  async logout(captureEvidence = false): Promise<void> {
    LoggerHelper.info("Cerrando sesión");
    await this.menuButton.click();
    await this.logoutLink.click();

    await expect(this.page.locator("#login-button")).toBeVisible();
    await this.captureEvidence(
      "2-suite2-06-logout.png",
      captureEvidence,
    );
  }

  private async captureEvidence(
    fileName: string,
    enabled = true,
  ): Promise<void> {
    if (!enabled) {
      return;
    }

    LoggerHelper.info(`Tomando evidencia: ${fileName}`);
    const evidenciasDir = path.join(process.cwd(), "reports", "evidencias");
    await mkdir(evidenciasDir, { recursive: true });
    await this.page.screenshot({
      path: path.join(evidenciasDir, fileName),
      fullPage: true,
    });
  }
}

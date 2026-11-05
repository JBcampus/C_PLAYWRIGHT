import { expect, type Page } from "@playwright/test";
import type { SELECTED_PRODUCTS } from "../../helpers/tarea2/sauceDemoData.js";

/**
 * Encapsula las interacciones y validaciones de las páginas de Sauce Demo.
 */
export class SauceDemoPage {
  /**
   * Crea el Page Object para la pestaña de navegador del test.
   * @param page - Pestaña de Playwright que se va a controlar.
   */
  constructor(private readonly page: Page) {}

  private testAttribute(testId: string) {
    return this.page.locator(`[data-test="${testId}"]`);
  }

  /**
   * Abre la página de inicio de sesión.
   * @param url - Dirección web de Sauce Demo.
   */
  async open(url: string): Promise<void> {
    await this.page.goto(url);
  }

  /**
   * Inicia sesión con las credenciales indicadas.
   * @param username - Nombre de usuario de demostración.
   * @param password - Contraseña de demostración.
   */
  async login(username: string, password: string): Promise<void> {
    await this.page.getByPlaceholder("Username").fill(username);
    await this.page.getByPlaceholder("Password").fill(password);
    await this.page.getByRole("button", { name: "Login" }).click();
  }

  /**
   * Verifica que se haya cargado el inventario y su título secundario.
   */
  async expectInventory(): Promise<void> {
    await expect(this.page).toHaveURL(/\/inventory\.html$/);
    await expect(this.page.locator(".title")).toHaveText("Products");
  }

  /**
   * Agrega al carrito los productos seleccionados mediante sus atributos data-test.
   * @param products - Productos que se van a agregar.
   */
  async addProducts(
    products: readonly (typeof SELECTED_PRODUCTS)[number][],
  ): Promise<void> {
    for (const product of products) {
      await this.testAttribute(product.addButtonTestId).click();
    }
  }

  /**
   * Comprueba que el carrito muestre la cantidad esperada de artículos.
   * @param quantity - Cantidad de productos esperados.
   */
  async expectCartBadge(quantity: number): Promise<void> {
    await expect(this.testAttribute("shopping-cart-badge")).toHaveText(
      String(quantity),
    );
  }

  /**
   * Navega desde el inventario al carrito de compras.
   */
  async openCart(): Promise<void> {
    await this.testAttribute("shopping-cart-link").click();
  }

  /**
   * Valida que el carrito contenga todos los productos seleccionados.
   * @param products - Productos que deben aparecer en el carrito.
   */
  async expectCartContents(
    products: readonly (typeof SELECTED_PRODUCTS)[number][],
  ): Promise<void> {
    await expect(this.page.locator(".cart_item")).toHaveCount(products.length);
    for (const product of products) {
      await expect(
        this.page.locator(".cart_item", { hasText: product.name }),
      ).toHaveCount(1);
    }
  }

  /**
   * Abre el formulario de información del checkout.
   */
  async startCheckout(): Promise<void> {
    await this.testAttribute("checkout").click();
  }

  /**
   * Verifica el título de la página de información del checkout.
   */
  async expectCheckoutInformation(): Promise<void> {
    await expect(this.page.locator(".title")).toHaveText(
      "Checkout: Your Information",
    );
  }

  /**
   * Completa la información simulada y avanza al resumen del pedido.
   * @param firstName - Nombre ficticio.
   * @param lastName - Apellido ficticio.
   * @param postalCode - Código postal ficticio.
   */
  async completeCheckoutInformation(
    firstName: string,
    lastName: string,
    postalCode: string,
  ): Promise<void> {
    await this.testAttribute("firstName").fill(firstName);
    await this.testAttribute("lastName").fill(lastName);
    await this.testAttribute("postalCode").fill(postalCode);
    await this.testAttribute("continue").click();
  }

  /**
   * Verifica el título y los productos del resumen antes de finalizar la compra.
   * @param products - Productos que deben aparecer en el resumen.
   */
  async expectCheckoutOverview(
    products: readonly (typeof SELECTED_PRODUCTS)[number][],
  ): Promise<void> {
    await expect(this.page.locator(".title")).toHaveText("Checkout: Overview");
    await expect(this.page.locator(".cart_item")).toHaveCount(products.length);
    for (const product of products) {
      await expect(
        this.page.locator(".cart_item", { hasText: product.name }),
      ).toHaveCount(1);
    }
  }

  /**
   * Confirma la compra desde el resumen.
   */
  async finishCheckout(): Promise<void> {
    await this.testAttribute("finish").click();
  }

  /**
   * Verifica el título y el mensaje de compra completada.
   */
  async expectCheckoutComplete(): Promise<void> {
    await expect(this.page.locator(".title")).toHaveText("Checkout: Complete!");
    await expect(
      this.page.getByRole("heading", { name: "Thank you for your order!" }),
    ).toBeVisible();
  }
}

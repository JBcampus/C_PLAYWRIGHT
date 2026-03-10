import { Locator, Page, expect } from "@playwright/test";

/**
 * Page Object para la vista de inventario en Sauce Demo.
 */
export class InventoryPage {
  private readonly title: Locator;
  private readonly inventoryItems: Locator;
  private readonly menuButton: Locator;
  private readonly logoutLink: Locator;
  /**
   * Crea una instancia de `InventoryPage`.
   * @param page Instancia de Playwright `Page`.
   */
  constructor(private page: Page) {
    this.title = page.locator(".title");
    this.inventoryItems = page.locator(".inventory_item");
    this.menuButton = page.locator("#react-burger-menu-btn");
    this.logoutLink = page.locator("#logout_sidebar_link");
  }
  /**
   * Navega directamente a la URL del inventario.
   * @returns Promise<void>
   */
  async goto(): Promise<void> {
    await this.page.goto("https://www.saucedemo.com/inventory.html");
  }

  /**
   * Espera que la página de inventario esté cargada y visible.
   * - Comprueba URL, título y al menos un item visible.
   * @returns Promise<void>
   */
  async expectLoaded(): Promise<void> {
    await expect(this.page).toHaveURL(/inventory/);
    await expect(this.title).toHaveText("Products");
    await expect(this.inventoryItems.first()).toBeVisible();
  }

  /**
   * Valida que la cantidad de items es al menos `min`.
   * @param min Número mínimo de elementos esperados.
   * @returns Promise<void>
   */
  async expectItemsCountAtLeast(min: number): Promise<void> {
    expect(await this.inventoryItems.count()).toBeGreaterThanOrEqual(min);
  }

  /**
   * Realiza logout desde el menú lateral.
   * @returns Promise<void>
   */
  async logout(): Promise<void> {
    await this.menuButton.click();
    await expect(this.logoutLink).toBeVisible();
    await this.logoutLink.click();
    await expect(this.page).toHaveURL(/saucedemo\.com\/?/);
  }

  /**
   * Selecciona una opción del filtro de ordenamiento.
   * @param optionLabelOrValue Etiqueta visible del select o el valor del option.
   * @returns Promise<void>
   * @example
   * await inventoryPage.sortBy('Name (A to Z)');
   */
  async sortBy(optionLabelOrValue: string): Promise<void> {
    const select = this.page.locator("select.product_sort_container");
    try {
      await select.selectOption({ label: optionLabelOrValue });
    } catch (e) {
      await select.selectOption(optionLabelOrValue as any);
    }
  }

  /**
   * Agrega al carrito el item situado en el índice `index`.
   * @param index Índice (0-based) del item en la lista de inventario.
   * @returns Promise<void>
   */
  async addToCartByIndex(index: number): Promise<void> {
    const item = this.inventoryItems.nth(index);
    const btn = item.locator("button");
    await btn.click();
  }

  /**
   * Agrega varios items al carrito según los índices provistos.
   * @param indices Array de índices (0-based) a agregar.
   * @returns Promise<void>
   * @example
   * await inventoryPage.addToCartByIndices([0,2,3]);
   */
  async addToCartByIndices(indices: number[]): Promise<void> {
    for (const i of indices) {
      await this.addToCartByIndex(i);
    }
  }
}

import { Locator, Page, expect } from '@playwright/test';
import { LoginHelper } from '../../helpers/tarea2/loginHelper';

/**
 * Representa la página principal una vez iniciada la sesión (Inventario de Productos).
 */
export class InventoryPage {
  private readonly page: Page;
  private readonly secondaryTitle: Locator;
  private readonly menuButton: Locator;
  private readonly logoutLink: Locator;

  /**
   * Inicializa una nueva instancia de la clase InventoryPage.
   * @param page - Objeto Page de Playwright.
   */
  constructor(page: Page) {
    this.page = page;
    this.secondaryTitle = page.locator('[data-test="title"]');
    this.menuButton = page.locator('#react-burger-menu-btn');
    this.logoutLink = page.locator('[data-test="logout-sidebar-link"]');
  }

  /**
   * Valida que la URL actual coincida exactamente con la sección de inventario.
   */
  async validateUrl(): Promise<void> {
    await expect(this.page).toHaveURL(/.*inventory.html/);
  }

  /**
   * Verifica la correcta visualización del encabezado de productos secundarios.
   * @param expectedTitle - Texto esperado (ej: 'Products').
   */
  async validateTitle(expectedTitle: string): Promise<void> {
    await expect(this.secondaryTitle).toBeVisible();
    await expect(this.secondaryTitle).toHaveText(expectedTitle);
  }

  /**
   * Despliega la barra lateral de navegación principal y presiona cerrar sesión.
   */
  async logout(): Promise<void> {
    await this.menuButton.click();
    await this.logoutLink.click();
  }

  /**
   * Valida el retorno satisfactorio a la página inicial tras la desconexión.
   */
  async validateRedirection(): Promise<void> {
    await expect(this.page).toHaveURL(LoginHelper.baseUrl);
  }
}

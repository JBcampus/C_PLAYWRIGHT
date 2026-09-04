import { Page, Locator, expect } from '@playwright/test';

/**
 * Representa la página principal de Automation Exercise.
 * @category POM
 */
export class HomePage {
    private page: Page;
    private contactUsBtn: Locator;
    private featuresItemsSection: Locator;
    private poloBrandBtn: Locator;

    /**
     * Inicializa los localizadores de la página de inicio.
     * @param page - Instancia de la página de Playwright.
     */
    constructor(page: Page) {
        this.page = page;
        this.contactUsBtn = page.getByRole('link', { name: 'Contact us' });
        this.featuresItemsSection = page.locator('.features_items');
        this.poloBrandBtn = page.getByRole('link', { name: 'Polo' });
    }

    /**
     * Navega hacia la URL principal de la aplicación.
     */
    async navigateToHome(): Promise<void> {
        await this.page.goto('https://automationexercise.com');
    }

    /**
     * Hace clic en el botón de contacto superior.
     */
    async clickContactUs(): Promise<void> {
        await this.contactUsBtn.click();
    }

    /**
     * Verifica que la sección de productos destacados esté visible en el Home.
     */
    async verifyFeaturesItemsVisible(): Promise<void> {
        await expect(this.featuresItemsSection).toBeVisible();
    }

    /**
     * Filtra los productos haciendo clic en la marca POLO.
     */
    async clickPoloBrand(): Promise<void> {
        await this.poloBrandBtn.click();
        if (this.page.url().includes('#google_vignette')) {
            await this.page.goto('https://automationexercise.com/brand_products/Polo');
        }
    }

    /**
     * Verifica que el catálogo esté filtrado por la marca POLO.
     */
    async verifyPoloBrandPage(): Promise<void> {
        await expect(this.page).toHaveURL(/.*\/brand_products\/Polo/);
    }
}

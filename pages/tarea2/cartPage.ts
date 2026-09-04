import { Page, Locator, expect } from '@playwright/test';

/**
 * Gestiona las interacciones de selección y validación del carrito.
 * @category POM
 */
export class CartPage {
    private page: Page;
    private firstProductContainer: Locator;
    private firstProductAddCart: Locator;
    private viewCartBtn: Locator;
    private checkoutBtn: Locator;

    /**
     * Inicializa los componentes de la vista de catálogo y carrito.
     * @param page - Instancia de la página de Playwright.
     */
    constructor(page: Page) {
        this.page = page;
        // Apuntamos al contenedor del primer producto expuesto
        this.firstProductContainer = page.locator('.features_items .col-sm-4').first();
        this.firstProductAddCart = this.firstProductContainer.locator('.productinfo .add-to-cart');
        this.viewCartBtn = page.locator('#cartModal a[href="/view_cart"]');
        this.checkoutBtn = page.locator('.check_out');
    }

    /**
     * Obtiene el nombre textual del primer producto en la lista actual.
     * @returns El nombre del producto como cadena de texto.
     */
    async getFirstProductName(): Promise<string> {
        const text = await this.firstProductContainer.locator('.productinfo p').textContent();
        return text ? text.trim() : '';
    }

    /**
     * Agrega el primer elemento filtrado al carrito.
     */
    async addFirstProductToCart(): Promise<void> {
        await this.firstProductAddCart.click();
    }

    /**
     * Espera a que el modal aparezca, valida visibilidad y accede al carrito.
     */
    async verifyAndClickViewCart(): Promise<void> {
        await expect(this.page.locator('#cartModal')).toBeVisible({ timeout: 10000 });
        await expect(this.viewCartBtn).toBeVisible({ timeout: 10000 });
        await this.viewCartBtn.click();
    }

    /**
     * Valida que el producto con un nombre específico esté presente en la tabla del carrito.
     * @param productName - Nombre exacto del producto a buscar.
     */
    async verifyProductInCart(productName: string): Promise<void> {
        // Corrección del selector para buscar de forma exacta dentro de la descripción del carrito
        const productLocator = this.page.locator(`table#cart_info_table td.cart_description h4 a:has-text("${productName}")`);
        await expect(productLocator).toBeVisible();
    }

    /**
     * Avanza en el flujo haciendo clic en Proceder al Pago.
     */
    async clickProceedToCheckout(): Promise<void> {
        await this.checkoutBtn.click();
    }
}

// pages/inventory.page.ts

import { Page } from 'playwright';

/**
 * Clase que representa la página de inventario en SauceDemo.
 */
export class InventoryPage {
    navigate(page: Page) {
      throw new Error('Method not implemented.');
    }
    private page: Page;

    /**
     * Crea una instancia de InventoryPage.
     * @param page - La página de Playwright.
     */
    constructor(page: Page) {
        this.page = page;
    }

    /**
     * Inicia sesión en la aplicación.
     * @param username - Nombre de usuario para iniciar sesión.
     * @param password - Contraseña para iniciar sesión.
     * @example
     * await inventoryPage.login('standard_user', 'secret_sauce');
     */
    async login(username: string, password: string): Promise<void> {
        await this.page.goto('https://www.saucedemo.com');
        await this.page.fill('#user-name', username);
        await this.page.fill('#password', password);
        await this.page.click('#login-button');
    }

    /**
     * Ordena los productos en la página de inventario.
     * @param sort - Parámetro para ordenar los productos. Puede ser "hilo", "lohi" o "az".
     * @example
     * await inventoryPage.sort('hilo');
     */
    async sort(sort: 'hilo' | 'lohi' | 'az'): Promise<void> {
        const sortSelector = '.product_sort_container';
        await this.page.selectOption(sortSelector, sort);
    }

    /**
     * Agrega productos al carrito según el índice proporcionado.
     * @param indices - Array de índices de productos a agregar al carrito.
     * @example
     * await inventoryPage.addProductsToCart([0, 2]);
     */
    async addProductsToCart(indices: number[]): Promise<void> {
        for (const index of indices) {
            const addToCartButton = `#add-to-cart-sauce-labs-backpack`; // Cambiar según el índice
            await this.page.click(addToCartButton);
        }
    }

    /**
     * Obtiene el número de productos en el carrito.
     * @returns El número de productos en el carrito.
     * @example
     * const cartCount = await inventoryPage.getCartCount();
     */
    async getCartCount(): Promise<number> {
        const cartBadge = await this.page.locator('.shopping_cart_badge');
        return parseInt(await cartBadge.innerText(), 10);
    }
}
import { expect, Locator, Page } from '@playwright/test';

/**
 * Page Object for the inventory ("Products") page.
 */
export class InventoryPage {
    private readonly page: Page;
    private readonly title: Locator;
    private readonly productNames: Locator;
    private readonly cartBadge: Locator;
    private readonly cartLink: Locator;

    /**
     * @param page - Playwright `Page` object provided by the test.
     */
    constructor(page: Page) {
        this.page = page;
        this.title = page.locator('[data-test="title"]');
        this.productNames = page.locator('[data-test="inventory-item-name"]');
        this.cartBadge = page.locator('[data-test="shopping-cart-badge"]');
        this.cartLink = page.locator('[data-test="shopping-cart-link"]');
    }

    /**
     * Validates the title displayed in the page.
     * @param expectedTitle - Expected text, e.g. "Products".
     */
    async verifyTitle(expectedTitle: string): Promise<void> {
        await expect(this.title).toHaveText(expectedTitle);
    }

    /**
     * Validates that the product is visible and then clicks its [Add to cart] button.
     * @param productName - Name displayed for the product.
     * @param addToCartTestId - `data-test` attribute value of the product's [Add to cart] button.
     */
    async addProductToCart(productName: string, addToCartTestId: string): Promise<void> {
        const product = this.productNames.filter({ hasText: productName });
        await expect(product).toBeVisible();
        await this.page.click(`[data-test="${addToCartTestId}"]`);
    }

    /**
     * Validates that the shopping cart badge is visible and shows the expected number.
     * @param expectedCount - Number of products expected in the cart, as text (e.g. "3").
     */
    async verifyCartBadgeCount(expectedCount: string): Promise<void> {
        await expect(this.cartBadge).toBeVisible();
        await expect(this.cartBadge).toHaveText(expectedCount);
    }

    /**
     * Clicks the shopping cart icon to open the cart.
     */
    async goToCart(): Promise<void> {
        await this.cartLink.click();
    }
}

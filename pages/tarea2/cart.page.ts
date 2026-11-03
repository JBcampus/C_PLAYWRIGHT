import { Locator, Page } from '@playwright/test';

/**
 * Page Object for the shopping cart page.
 */
export class CartPage {
    private readonly checkoutButton: Locator;

    /**
     * @param page - Playwright `Page` object provided by the test.
     */
    constructor(page: Page) {
        this.checkoutButton = page.locator('[data-test="checkout"]');
    }

    /**
     * Clicks the [Checkout] button.
     */
    async clickCheckout(): Promise<void> {
        await this.checkoutButton.click();
    }
}

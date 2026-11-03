import { expect, Locator, Page } from '@playwright/test';

/**
 * Page Object for "Checkout: Complete!".
 */
export class CheckoutCompletePage {
    private readonly title: Locator;
    private readonly completeHeader: Locator;

    /**
     * @param page - Playwright `Page` object provided by the test.
     */
    constructor(page: Page) {
        this.title = page.locator('[data-test="title"]');
        this.completeHeader = page.locator('[data-test="complete-header"]');
    }

    /**
     * Validates the title displayed in the page.
     * @param expectedTitle - Expected text, e.g. "Checkout: Complete!".
     */
    async verifyTitle(expectedTitle: string): Promise<void> {
        await expect(this.title).toHaveText(expectedTitle);
    }

    /**
     * Validates the confirmation message shown after finishing the order.
     * @param expectedMessage - Expected text, e.g. "Thank you for your order!".
     */
    async verifyCompleteHeader(expectedMessage: string): Promise<void> {
        await expect(this.completeHeader).toHaveText(expectedMessage);
    }
}

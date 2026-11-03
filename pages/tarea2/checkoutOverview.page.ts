import { expect, Locator, Page } from '@playwright/test';

/**
 * Page Object for "Checkout: Overview".
 */
export class CheckoutOverviewPage {
    private readonly title: Locator;
    private readonly finishButton: Locator;

    /**
     * @param page - Playwright `Page` object provided by the test.
     */
    constructor(page: Page) {
        this.title = page.locator('[data-test="title"]');
        this.finishButton = page.locator('[data-test="finish"]');
    }

    /**
     * Validates the title displayed in the page.
     * @param expectedTitle - Expected text, e.g. "Checkout: Overview".
     */
    async verifyTitle(expectedTitle: string): Promise<void> {
        await expect(this.title).toHaveText(expectedTitle);
    }

    /**
     * Clicks the [Finish] button.
     */
    async clickFinish(): Promise<void> {
        await this.finishButton.click();
    }
}

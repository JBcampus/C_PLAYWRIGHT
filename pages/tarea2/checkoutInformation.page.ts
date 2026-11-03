import { expect, Locator, Page } from '@playwright/test';

/**
 * Page Object for "Checkout: Your Information".
 */
export class CheckoutInformationPage {
    private readonly title: Locator;
    private readonly firstNameInput: Locator;
    private readonly lastNameInput: Locator;
    private readonly postalCodeInput: Locator;
    private readonly continueButton: Locator;

    /**
     * @param page - Playwright `Page` object provided by the test.
     */
    constructor(page: Page) {
        this.title = page.locator('[data-test="title"]');
        this.firstNameInput = page.locator('[data-test="firstName"]');
        this.lastNameInput = page.locator('[data-test="lastName"]');
        this.postalCodeInput = page.locator('[data-test="postalCode"]');
        this.continueButton = page.locator('[data-test="continue"]');
    }

    /**
     * Validates the title displayed in the page.
     * @param expectedTitle - Expected text, e.g. "Checkout: Your Information".
     */
    async verifyTitle(expectedTitle: string): Promise<void> {
        await expect(this.title).toHaveText(expectedTitle);
    }

    /**
     * Fills the user data form.
     * @param firstName - First name to type.
     * @param lastName - Last name to type.
     * @param postalCode - Postal code to type.
     */
    async fillUserData(firstName: string, lastName: string, postalCode: string): Promise<void> {
        await this.firstNameInput.fill(firstName);
        await this.lastNameInput.fill(lastName);
        await this.postalCodeInput.fill(postalCode);
    }

    /**
     * Clicks the [Continue] button.
     */
    async clickContinue(): Promise<void> {
        await this.continueButton.click();
    }
}

import { expect, Locator, Page } from '@playwright/test';
import { BASE_URL } from '../../helpers/tarea2/testData.helper';


/**
 * Page Object for the login page of https://www.saucedemo.com/
 */
export class LoginPage {
    private readonly page: Page;
    private readonly usernameInput: Locator;
    private readonly passwordInput: Locator;
    private readonly loginButton: Locator;

    /**
     * @param page - Playwright `Page` object provided by the test.
     */
    constructor(page: Page) {
        this.page = page;
        this.usernameInput = page.locator('#user-name');
        this.passwordInput = page.locator('#password');
        this.loginButton = page.locator('[data-test="login-button"]');
    }

    /**
     * Navigates to the login page.
     */
    async goto(): Promise<void> {
        await this.page.goto(BASE_URL);
    }

    /**
     * Fills the credentials and clicks the [Login] button.
     * @param username - User name to type.
     * @param password - Password to type.
     */
    async login(username: string, password: string): Promise<void> {
        await this.usernameInput.fill(username);
        await this.passwordInput.fill(password);
        await this.loginButton.click();
    }

    /**
     * Validates that the browser is on the expected URL.
     * @param url - Full URL expected in the browser.
     */
    async verifyUrl(url: string): Promise<void> {
        await expect(this.page).toHaveURL(url);
    }
}

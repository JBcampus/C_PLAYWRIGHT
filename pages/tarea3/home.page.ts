import { expect, Locator, Page } from '@playwright/test';
import { BASE_URL } from '../../helpers/tarea3/testData.helper';

/**
 * Page Object for the login page of https://automationexercise.com/
 */
export class HomePage {
    private readonly page: Page;
    private readonly homeLink: Locator;
    private readonly contactLink: Locator;
    private readonly poloLink: Locator;

    /**
     * @param page - Playwright `Page` object provided by the test.
     */
    constructor(page: Page) {
        this.page = page;
        this.homeLink = page.locator('a[href="/"]');
        this.contactLink = page.locator('a[href="/contact_us"]');
        this.poloLink = page.locator('ahref="/brand_products/Polo"');
    }

    /**
     * Navigates to the Home page.
     */
    async goto(): Promise<void> {
        await this.page.goto(BASE_URL);
    }

    /**
       * Click on the [contac_us] button.
       */
    async clickContactUs(): Promise<void> {
        await this.contactLink.click();
    }

     /**
       * Click on the [polo] button.
       */
    async clickPolo(): Promise<void> {
        await this.poloLink.click();
    }

    /**
     * Validates that the browser is on the expected URL.
     * @param url - Full URL expected in the browser.
     */
    async verifyUrl(url: string): Promise<void> {
        await expect(this.page).toHaveURL(url);
    }
}

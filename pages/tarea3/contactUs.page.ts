import { expect, Locator, Page } from '@playwright/test';
import { dataFilePath } from "../../helpers/utils/upload.helper";


/**
 * Page Object for "Contact us" page
 */
export class contactUsPage {
    private readonly page: Page;
    private readonly nameInput: Locator;
    private readonly emailInput: Locator;
    private readonly subjectInput: Locator;
    private readonly messageInput: Locator;
    // Upload file from [Choose File] button
    private readonly fileInput: Locator;

    // Submit ContactUs info form
    private readonly submitButton: Locator;
    // Confirm JS dialog
    //private readonly jsConfirmBtn: Locator; 

    /**
     * @param page - Playwright `Page` object provided by the test.
     */
    constructor(page: Page) {
        this.page = page;
        this.nameInput = page.locator('[data-qa="name"]');
        this.emailInput = page.locator('[data-qa="email"]');
        this.subjectInput = page.locator('[data-qa="subject"]');
        this.messageInput = page.locator('[data-qa="message"]');
        // [Choose file] button
        this.fileInput = page.locator('input[type="file"]');
        // [Submit] button
        this.submitButton = page.locator('[data-qa="submit-button"]');
    }

    /**
     * Fills the info, choose the file and clicks the [Submit] button.
     * @param name - User name to type.
     * @param email - Email to type.
     * @param subject - Subject to type.
     * @param message - Message to type.
     */
    async contactUs(name: string, email: string, subject: string, message: string, fileName: string): Promise<void> {
        await this.nameInput.fill(name);
        await this.emailInput.fill(email);
        await this.subjectInput.fill(subject);
        await this.messageInput.fill(message);
        // upload file
        //await this.fileInput.setInputFiles(dataFilePath(fileName));
        
        // Click submit button
        await this.submitButton.click();
    }

}

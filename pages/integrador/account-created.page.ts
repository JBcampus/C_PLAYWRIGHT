import { Locator, Page, expect } from '@playwright/test';

/**
 * Página de confirmación de cuenta creada.
 */
export class AccountCreatedPage {
  private readonly page: Page;
  private readonly messageLocator : Locator;
  private readonly continueButtonLocator : Locator;


  constructor(page: Page) {
    this.page = page;
    this.messageLocator = page.locator('p');
    //this.continueButtonLocator = page.locator('[data-qa="continue-button"]');
    this.continueButtonLocator = page.getByRole('link', { name: 'Continue' });
  }

  async assertCreated() {
    await expect(this.messageLocator).toHaveText('successfully created!');
  }

  async continue() {
    await this.continueButtonLocator.waitFor({ state: 'visible' });
    await this.continueButtonLocator.click();
  }
}
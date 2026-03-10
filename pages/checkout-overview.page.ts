import { Page } from '@playwright/test';

export class CheckoutOverviewPage {
  constructor(private page: Page) {}

  async finish() {
    await this.page.click('#finish');
  }
}
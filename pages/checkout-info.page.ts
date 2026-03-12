import { Page } from "@playwright/test";

export class CheckoutInfoPage {
  constructor(private page: Page) {}

  async fillForm() {
    await this.page.fill("#first-name", "Christian");
    await this.page.fill("#last-name", "QA");
    await this.page.fill("#postal-code", "00000");
    await this.page.click("#continue");
  }
}

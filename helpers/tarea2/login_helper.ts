import { expect, Page } from "@playwright/test";

export class LoginHelper {
  constructor(private page: Page) {}

  async cerrarTelemetria() {
    await this.page.route("https://events.backtrace.io/**", async (route) => {
      await route.fulfill({ status: 204, body: "" });
    });
  }
}

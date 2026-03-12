import { Page, Locator, expect } from "@playwright/test";

export class InventoryPage {
  private readonly title: Locator;
  private readonly inventoryItems: Locator;
  private readonly menuButton: Locator;
  private readonly logoutLink: Locator;

  constructor(private page: Page) {
    this.title = page.locator(".title");
    this.inventoryItems = page.locator(".inventory_item");
    this.menuButton = page.locator("#react-burger-menu-btn");
    this.logoutLink = page.locator("#logout_sidebar_link");
  }

  async goto(): Promise<void> {
    await this.page.goto("https://www.saucedemo.com/inventory.html");
  }

  async expectLoaded(): Promise<void> {
    await expect(this.page).toHaveURL(/inventory/);
    await expect(this.title).toHaveText("Products");
    await expect(this.inventoryItems.first()).toBeVisible();
  }

  async expectItemsCountAtLeast(min: number): Promise<void> {
    expect(await this.inventoryItems.count()).toBeGreaterThanOrEqual(min);
  }

  async logout(): Promise<void> {
    await this.menuButton.click();
    await expect(this.logoutLink).toBeVisible();
    await this.logoutLink.click();

    await expect(this.page).toHaveURL(/saucedemo\.com\/?/);
  }
}

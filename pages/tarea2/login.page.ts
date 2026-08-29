import { Page, Locator, expect } from "@playwright/test";

export class LoginPage {
  private readonly username: Locator;
  private readonly password: Locator;
  private readonly submit: Locator;
  private readonly menu: Locator;
  private readonly lnklogout: Locator;

  constructor(private page: Page) {
    this.username = page.locator("#user-name");
    this.password = page.locator("#password");
    this.submit = page.locator("#login-button");
    this.menu = page.locator("#react-burger-menu-btn");
    this.lnklogout = page.locator("#logout_sidebar_link");
  }

  async goto() {
    await this.page.goto("https://www.saucedemo.com");
  }
  async login(username: string, password: string) {
    await this.username.fill(username);
    await this.password.fill(password);
    await this.submit.click();
  }

  async logout() {
    await this.menu.click();
    await this.lnklogout.click();
  }
}

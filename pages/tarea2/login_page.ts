import { Page, expect } from "@playwright/test";

export class LoginPage {
  constructor(private page: Page) {}

  //ingresar a la pagina principal
  async goToLogin() {
    await this.page.goto("https://www.saucedemo.com/");
  }

  //login ingresando los parametros usuario y pass
  async login(username: string, password: string) {
    await this.page.fill("#user-name", username);
    await this.page.fill("#password", password);
    await this.page.click("#login-button");
  }

  async logout() {
    await this.page.click("#react-burger-menu-btn");
    await this.page.click("#logout_sidebar_link");
  }
}

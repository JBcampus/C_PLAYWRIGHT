// LoginPage.ts
import { expect, Page } from "@playwright/test";

export class LoginPages {
  //Componentes de Páginas asociadas al módulo Login
  constructor(private page: Page) {}

  //permite abrir la página principal de la aplicación web
  async gotoHome() {
    await this.page.goto("https://practice.expandtesting.com/");
  }

  //permite realizar el login de un usuario, recibiendo como parámetros el nombre de usuario y la contraseña
  async login(user: string, password: string) {
    await this.page.fill("#username", user);
    await this.page.fill("#password", password);
    await this.page.click('button[type="submit"]');
  }

  //permite validar si el login fue exitoso o no, según el mensaje que se le pase como parámetro
  async validarLogin(mensaje: string) {
    const divFlash = this.page.locator("#flash");
    await expect(divFlash).toBeVisible();

    if (mensaje === "PW_Correcto") {
      await expect(divFlash).toContainText("You logged into a secure area!");
    } else if (mensaje === "PW_Incorrecto") {
      await expect(divFlash).toContainText("Your password is invalid!");
    } else if (mensaje === "US_Incorrecto") {
      await expect(divFlash).toContainText("Your username is invalid!");
    }
  }

  //permite cerrar las ventanas de publicidad que aparecen en la página web para asegurar que no interfieran con la ejecución de las pruebas
  async cerrarPublicidad() {
    await this.page.route(
      /doubleclick\.net|googlesyndication\.com|googleadservices\.com|adsbygoogle|adservice\.google\.com/i,
      (route) => route.abort(),
    );
  }
}

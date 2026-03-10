import { Page } from '@playwright/test';
import { log } from '../helpers/log.helper';

export class LoginPage {
  constructor(private page: Page) {}

  /** Navega al login */
  async goto() {
    log('Navegando a login');
    await this.page.goto('https://www.saucedemo.com/');
  }

  /**
   * Autentica un usuario.
   * @param username Usuario.
   * @param password Contraseña.
   */
  async login(username: string, password: string) {
    log(`Autenticando usuario ${username}`);
    await this.page.fill('#user-name', username);
    await this.page.fill('#password', password);
    await this.page.click('#login-button');
  }
}
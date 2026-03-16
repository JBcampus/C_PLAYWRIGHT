import { Page } from '@playwright/test';
import { log } from '../../helpers/log.helper';

/**
 * Página principal de AutomationExercise.
 */
export class HomePage {
  constructor(private page: Page) {}

  async goto() {
    log('Navegando a Home');
    await this.page.goto('https://automationexercise.com/', { timeout: 60000 });
  }

  async goToSignupLogin() {
    log('Ingresando a Signup/Login');
    await this.page.click('a[href="/login"]');
  }

  async goToProducts() {
    await this.page.click('a[href="/products"]');
  }

  async goToCart() {
    await this.page.click('a[href="/view_cart"]');
  }
}
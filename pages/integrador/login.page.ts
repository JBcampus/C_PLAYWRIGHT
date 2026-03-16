import { Page } from '@playwright/test';

/**
 * Página de login.
 */
export class LoginPage {
  constructor(private page: Page) {}

  async login(email: string, password: string) {
    await this.page.fill('[data-qa="login-email"]', email);
    await this.page.fill('[data-qa="login-password"]', password);
    await this.page.click('[data-qa="login-button"]');
  }

  async assertLoggedIn(name: string) {        
    await this.page.getByText(`Logged in as ${name}`).isVisible();
  }
}
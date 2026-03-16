import { Page } from '@playwright/test';
import { log } from '../../helpers/log.helper';

/**
 * Página de registro.
 */
export class SignupPage {
  constructor(private page: Page) {}

  async signup(name: string, email: string) {
    log(`Registrando usuario ${email}`);
    await this.page.fill('[data-qa="signup-name"]', name);
    await this.page.fill('[data-qa="signup-email"]', email);
    await this.page.click('[data-qa="signup-button"]');
  }

  /**
   * Detecta si el usuario ya existe sin romper el test.
   */
  async handleExistingUser() {
    const error = this.page.locator('p:has-text("already exist")');
    if (await error.isVisible()) {
      log('Usuario ya existe, manejando excepción sin romper test');
      return true;
    }
    return false;
  }
}
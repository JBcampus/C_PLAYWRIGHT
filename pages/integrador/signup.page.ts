import { Page, Locator, expect } from "@playwright/test";

/**
 * Page Object para las vistas de Registro y Autenticación.
 */
export class SignupPage {
  readonly page: Page;
  readonly signupNameInput: Locator;
  readonly signupEmailInput: Locator;
  readonly signupButton: Locator;
  readonly loginEmailInput: Locator;
  readonly loginPasswordInput: Locator;
  readonly loginButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.signupNameInput = page.locator('input[data-qa="signup-name"]');
    this.signupEmailInput = page.locator('input[data-qa="signup-email"]');
    this.signupButton = page.locator('button[data-qa="signup-button"]');
    this.loginEmailInput = page.locator('input[data-qa="login-email"]');
    this.loginPasswordInput = page.locator('input[data-qa="login-password"]');
    this.loginButton = page.locator('button[data-qa="login-button"]');
  }

  /**
   * Navega a la página principal de Automation Exercise.
   */
  async navigate() {
    await this.page.goto("https://automationexercise.com/");
  }

  /**
   * Inicia el proceso de registro ingresando nombre y correo.
   * @param name Nombre del usuario.
   * @param email Correo electrónico.
   */
  async initiateSignup(name: string, email: string) {
    // 1. Ir a la sección de login/signup desde el menú superior
    await this.page.click('a[href="/login"]');

    // 2. Rellenar los campos de registro
    await this.signupNameInput.fill(name);
    await this.signupEmailInput.fill(email);
    await this.signupButton.click();
  }

  /**
   * Llena el formulario completo de creación de cuenta.
   */
  async fillAccountDetails(password: string) {
    await this.page.locator("#id_gender1").check();
    await this.page.locator("#password").fill(password);
    await this.page.locator("#days").selectOption("10");
    await this.page.locator("#months").selectOption("5");
    await this.page.locator("#years").selectOption("1995");

    // Address Info
    await this.page.locator("#first_name").fill("Carlos");
    await this.page.locator("#last_name").fill("Mendoza");
    await this.page.locator("#address1").fill("Av. Principal 123");
    await this.page.locator("#country").selectOption("United States");
    await this.page.locator("#state").fill("California");
    await this.page.locator("#city").fill("Los Angeles");
    await this.page.locator("#zipcode").fill("90001");
    await this.page.locator("#mobile_number").fill("987654321");
    await this.page.locator('button[data-qa="create-account"]').click();
  }

  /**
   * Inicia sesión con credenciales existentes.
   */
  async login(email: string, pass: string) {
    await this.page.locator('a[href="/login"]').click();
    await this.loginEmailInput.fill(email);
    await this.loginPasswordInput.fill(pass);
    await this.loginButton.click();
  }
}

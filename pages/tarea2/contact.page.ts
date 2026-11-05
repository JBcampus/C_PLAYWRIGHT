import { Page, Locator, expect } from '@playwright/test';

/** Page Object que encapsula las acciones del formulario Contact Us. */
export class ContactPage {
  constructor(private readonly page: Page) {}

  private get nameInput(): Locator { return this.page.locator('[data-qa="name"]'); }
  private get emailInput(): Locator { return this.page.locator('[data-qa="email"]'); }
  private get subjectInput(): Locator { return this.page.locator('[data-qa="subject"]'); }
  private get messageInput(): Locator { return this.page.locator('[data-qa="message"]'); }
  private get fileInput(): Locator { return this.page.locator('input[name="upload_file"]'); }
  private get submitButton(): Locator { return this.page.locator('[data-qa="submit-button"]'); }
  private get successMessage(): Locator { return this.page.getByText('Success! Your details have been submitted successfully.'); }

  /** Abre la página principal y entra al formulario de contacto. */
  async openContactForm(): Promise<void> {
    await this.page.goto('https://automationexercise.com/');
    await this.page.getByRole('link', { name: /contact us/i }).click();
    await expect(this.page.getByRole('heading', { name: /get in touch/i })).toBeVisible();
  }

  /** Completa los campos del formulario con información ficticia. */
  async fillContactForm(data: { name: string; email: string; subject: string; message: string }): Promise<void> {
    await this.nameInput.fill(data.name);
    await this.emailInput.fill(data.email);
    await this.subjectInput.fill(data.subject);
    await this.messageInput.fill(data.message);
  }

  /** Adjunta un archivo local al campo de carga. */
  async uploadFile(filePath: string): Promise<void> {
    await this.fileInput.setInputFiles(filePath);
    await expect(this.fileInput).toHaveValue(/demo-upload\.txt/);
  }

  /** Envía el formulario y acepta el diálogo JavaScript de confirmación. */
  async submitAndAcceptDialog(): Promise<void> {
    this.page.once('dialog', async dialog => {
      await dialog.accept();
    });
    await this.submitButton.click();
  }

  /** Comprueba el mensaje de envío exitoso y vuelve a Home. */
  async verifySuccessAndGoHome(): Promise<void> {
    await expect(this.successMessage).toBeVisible();
    await this.page.getByRole('link', { name: /^home$/i }).click();
    await expect(this.page).toHaveURL(/automationexercise\.com\/?$/);
  }
}

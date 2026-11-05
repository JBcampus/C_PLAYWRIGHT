import { Page, expect } from "@playwright/test";
import * as path from "path";

/**
 * @class ContactPage
 * @description Gestiona el formulario de contacto, subida de archivos y validaciones de éxito.
 */
export class ContactPage {
  readonly page: Page;
  readonly nameInput = 'input[data-qa="name"]';
  readonly emailInput = 'input[data-qa="email"]';
  readonly subjectInput = 'input[data-qa="subject"]';
  readonly messageTextArea = 'textarea[data-qa="message"]';
  readonly uploadFileInput = 'input[name="upload_file"]';
  readonly submitButton = 'input[data-qa="submit-button"]';
  readonly successMessage = ".status.alert.alert-success";
  readonly homeButton = ".btn.btn-success";

  constructor(page: Page) {
    this.page = page;
  }

  /**
   * Llena el formulario de contacto con datos ficticios.
   */
  async fillContactForm(
    name: string,
    email: string,
    subject: string,
    message: string,
  ): Promise<void> {
    await this.page.fill(this.nameInput, name);
    await this.page.fill(this.emailInput, email);
    await this.page.fill(this.subjectInput, subject);
    await this.page.fill(this.messageTextArea, message);
  }

  /**
   * Selecciona y carga el archivo demo-upload.txt desde la carpeta data.
   */
  async uploadFile(): Promise<void> {
    const filePath = path.join(process.cwd(), "data", "demo-upload.txt");
    await this.page.setInputFiles(this.uploadFileInput, filePath);
  }

  /**
   * Hace clic en enviar formulario.
   */
  async submitForm(): Promise<void> {
    await this.page.click(this.submitButton);
  }

  /**
   * Valida el mensaje de éxito tras el envío.
   */
  async validateSuccessMessage(): Promise<void> {
    await expect(this.page.locator(this.successMessage)).toBeVisible();
    await expect(this.page.locator(this.successMessage)).toHaveText(
      "Success! Your details have been submitted successfully.",
    );
  }

  /**
   * Da clic en el botón Home después de enviar.
   */
  async clickHome(): Promise<void> {
    await this.page.click(this.homeButton);
  }
}

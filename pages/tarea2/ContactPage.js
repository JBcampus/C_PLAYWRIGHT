/**
 * Clase que representa la página de Contact Us en AutomationExercise.
 */
export class ContactPage {
  /**
   * @param {import('@playwright/test').Page} page - Instancia de la página de Playwright.
   */
  constructor(page) {
    this.page = page;
    this.contactUsBtn = page.locator('a[href="/contact_us"]');
    this.nameInput = page.locator('input[data-qa="name"]');
    this.emailInput = page.locator('input[data-qa="email"]');
    this.subjectInput = page.locator('input[data-qa="subject"]');
    this.messageInput = page.locator('textarea[data-qa="message"]');
    this.fileInput = page.locator('input[name="upload_file"]');
    this.submitBtn = page.locator('input[data-qa="submit-button"]');
    this.successAlert = page.locator('.status.alert-success');
    this.homeBtn = page.locator('a.btn-success[href="/"]');
  }

  /**
   * Navega a la sección Contact Us.
   */
  async navigateToContactUs() {
    await this.contactUsBtn.click();
  }

  /**
   * Llena el formulario de contacto con datos.
   * @param {string} name - Nombre del usuario.
   * @param {string} email - Correo electrónico.
   * @param {string} subject - Asunto del mensaje.
   * @param {string} message - Contenido del mensaje.
   */
  async fillContactForm(name, email, subject, message) {
    await this.nameInput.fill(name);
    await this.emailInput.fill(email);
    await this.subjectInput.fill(subject);
    await this.messageInput.fill(message);
  }

  /**
   * Adjunta un archivo en el campo de subida de archivos.
   * @param {string} filePath - Ruta absoluta del archivo a cargar.
   */
  async uploadFile(filePath) {
    await this.fileInput.setInputFiles(filePath);
  }

  /**
   * Envía el formulario escuchando la alerta emergente de JavaScript.
   */
  async submitFormWithDialogHandling() {
    // Configura el listener del diálogo JS ANTES de hacer clic
    this.page.once('dialog', async (dialog) => {
      await dialog.accept();
    });
    await this.submitBtn.click();
  }
}
import { type Page, expect } from "@playwright/test";

/**
 * Page Object Model del formulario de contacto.
 */
export class ContactPage {
  constructor(private readonly page: Page) {}

  /**
   * Navega a la página principal.
   */
  async navigate(): Promise<void> {
    await this.page.goto("https://automationexercise.com/");
  }

  /**
   * Ingresa a la sección Contact us.
   */
  async openContactUs(): Promise<void> {
    await this.page
      .getByRole("link", {
        name: "Contact us",
      })
      .click();

    await expect(
      this.page.getByRole("heading", {
        name: "Get In Touch",
      }),
    ).toBeVisible();
  }

  /**
   * Completa los campos del formulario de contacto.
   *
   * @param name Nombre del usuario.
   * @param email Correo electrónico.
   * @param subject Asunto del mensaje.
   * @param message Mensaje de contacto.
   */
  async fillForm(
    name: string,
    email: string,
    subject: string,
    message: string,
  ): Promise<void> {
    await this.page.locator('[name="name"]').fill(name);

    await this.page.locator('[name="email"]').fill(email);

    await this.page.locator('[name="subject"]').fill(subject);

    await this.page.locator('[name="message"]').fill(message);
  }

  /**
   * Adjunta un archivo TXT al formulario de contacto.
   *
   * @param filePath Ruta completa del archivo que se desea cargar.
   */
  async uploadFile(filePath: string): Promise<void> {
    const fileInput = this.page.locator(
      'input[type="file"][name="upload_file"]',
    );

    // Verificar que exista el campo para adjuntar archivos.
    await expect(fileInput).toHaveCount(1);

    // Seleccionar el archivo.
    await fileInput.setInputFiles(filePath);

    // Verificar que el archivo seleccionado sea el esperado.
    await expect
      .poll(async () => {
        return await fileInput.evaluate(
          (input: HTMLInputElement) => input.files?.[0]?.name ?? "",
        );
      })
      .toBe("demo-upload.txt");
  }

  /**
   * Verifica que el archivo demo-upload.txt esté adjuntado.
   */
  async verifyFileUploaded(): Promise<void> {
    const fileInput = this.page.locator(
      'input[type="file"][name="upload_file"]',
    );

    const fileName = await fileInput.evaluate(
      (input: HTMLInputElement) => input.files?.[0]?.name ?? "",
    );

    expect(fileName).toBe("demo-upload.txt");
  }

  /**
   * Envía el formulario y acepta el diálogo JavaScript.
   *
   * @returns Mensaje mostrado por el diálogo.
   */
  async submitAndAcceptDialog(): Promise<string> {
    const dialogPromise = this.page.waitForEvent("dialog");

    const clickPromise = this.page
      .locator('#contact-us-form input[type="submit"]')
      .click();

    const dialog = await dialogPromise;

    const dialogMessage = dialog.message();

    await dialog.accept();

    await clickPromise;

    return dialogMessage;
  }

  /**
   * Valida el mensaje de envío exitoso del formulario de contacto.
   */
  async verifySuccessMessage(): Promise<void> {
    await expect(
      this.page.locator("#contact-page .status.alert.alert-success"),
    ).toHaveText("Success! Your details have been submitted successfully.");
  }

  /**
   * Regresa a la página principal desde la confirmación del formulario.
   */
  async goHome(): Promise<void> {
    await this.page.locator('a.btn.btn-success[href="/"]').click();

    await expect(this.page).toHaveURL("https://automationexercise.com/");
  }
}

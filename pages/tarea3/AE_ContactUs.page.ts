import { Locator, Page, expect } from "@playwright/test";

import {
  DialogOptions,
  jsDialogHandler,
} from "../../helpers/tarea3/AU_dialog.helper";

/** Page object del formulario de contacto de Automation Exercise. */
export class AE_ContactUs_Page {
  private readonly NAME: Locator;
  private readonly EMAIL: Locator;
  private readonly SUBJECT: Locator;
  private readonly MESSAGE: Locator;
  private readonly FILEPATH: Locator;
  private readonly BTNSUBMIT: Locator;
  private readonly RESULT: Locator;
  private readonly BTNHOME: Locator;

  /**
   * Crea el page object y prepara los localizadores del formulario.
   *
   * @param page - Instancia de pagina de Playwright.
   */
  constructor(private page: Page) {
    this.NAME = page.locator('input[name="name"]');
    this.EMAIL = page.locator('input[name="email"]');
    this.SUBJECT = page.locator('input[name="subject"]');
    this.MESSAGE = page.locator('textarea[name="message"]');
    this.FILEPATH = page.locator('input[name="upload_file"]');
    this.BTNSUBMIT = page.locator(
      'input[type="submit"][data-qa="submit-button"]',
    );
    this.RESULT = page.locator(
      'div.status.alert.alert-success[style="display: block;"]',
    );
    this.BTNHOME = page.locator('a.btn.btn-success[href="/"]');
  }

  /** Navega a la pagina de contacto. */
  async gotoContactUs(): Promise<void> {
    await this.page.goto("https://automationexercise.com/contact_us");
  }

  /** Completa los campos del formulario con datos de prueba. */
  async completarFormulario(): Promise<void> {
    await this.NAME.fill("Sergio Barrios");
    await this.EMAIL.fill("sergio.barrios@jbenterprise.com.pe");
    await this.SUBJECT.fill("Asunto de prueba - Tarea 3");
    await this.MESSAGE.fill(
      "Mensaje de prueba - Tarea 3 - Automatización de pruebas con Playwright",
    );
  }

  /**
   * Adjunta un archivo al campo de carga del formulario.
   *
   * @param filePath - Ruta del archivo que se desea adjuntar.
   */
  async uploadFile(filePath: string): Promise<void> {
    await this.FILEPATH.setInputFiles(filePath);
  }

  /**
   * Verifica que el campo de carga contenga el nombre del archivo esperado.
   *
   * @param fileName - Nombre del archivo que debe aparecer en el campo.
   */
  async expectUploadedFileName(fileName: string): Promise<void> {
    await expect(this.FILEPATH).toBeVisible();
    await expect(this.FILEPATH).toHaveValue(new RegExp(`${fileName}$`));
  }

  /** Envia el formulario de contacto. */
  async clickBtnSubmit(): Promise<void> {
    await this.BTNSUBMIT.click();
  }

  /** Registra el manejador para los dialogos JavaScript de la pagina.
   *
   * @param opt - Opciones para responder al dialogo.
   */
  async dialogHanler(opt: DialogOptions): Promise<void> {
    this.page.on("dialog", async (dialog) => {
      await jsDialogHandler(dialog, opt);
    });
  }

  /** Verifica que se muestre el mensaje de envio exitoso. */
  async expectResult(): Promise<void> {
    await expect(this.RESULT).toBeVisible();
  }

  /** Regresa a la pagina de inicio y verifica su titulo. */
  async clickBtnHome(): Promise<void> {
    await this.BTNHOME.click();
    await this.page.waitForLoadState("domcontentloaded");
    await expect(this.page).toHaveTitle("Automation Exercise");
  }
}

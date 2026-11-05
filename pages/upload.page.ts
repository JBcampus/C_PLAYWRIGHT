import { Page, Locator, expect } from "@playwright/test";

/**
 * Page Object de la página https://the-internet.herokuapp.com/upload
 *
 * Encapsula las acciones de subida y su verificación.
 */

export class UploadPage {
  private readonly fileInput: Locator;
  private readonly uploadBtn: Locator;
  private readonly uploadedFiles: Locator;

  constructor(private page: Page) {
    this.fileInput = page.locator("#file-upload");
    this.uploadBtn = page.locator("#file-submit");
    this.uploadedFiles = page.locator("#uploaded-files");
  }

  async goto(): Promise<void> {
    await this.page.goto("https://the-internet.herokuapp.com/upload");
  }

  async uploadFile(filePath: string): Promise<void> {
    await this.fileInput.setInputFiles(filePath);
    await this.uploadBtn.click();
  }

  async expectUploadedFileName(fileName: string): Promise<void> {
    await expect(this.uploadedFiles).toBeVisible();
    await expect(this.uploadedFiles).toHaveText(fileName);
  }
}

import { Locator, Page, expect } from "@playwright/test";
/**  * Page Object de la pagina https://theinternet.herokuapp.com/javascript_alerts
 * *  * - Encapsula acciones de upload y la verificación..
 * * - Mantiene los tests organizados y reutilizables.  */

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

import { Locator, Page, expect } from "@playwright/test";
import { DialogOptions, jsDialogHandler } from "../helpers/utils/dialog.helper";
/**
* Page Object de la pagina https://theinternet.
herokuapp.com/javascript_alerts

*
* - Encapsula acciones y resultado del módulo “JavaScript Alerts”.
* - Mantiene los tests organizados y reutilizables.
*/
export class JsAlertsPage {
  private readonly result: Locator;
  private readonly jsAlertBtn: Locator;
  private readonly jsConfirmBtn: Locator;
  private readonly jsPromptBtn: Locator;
  constructor(private page: Page) {
    this.result = page.locator("#result");
    this.jsAlertBtn = page.getByRole("button", { name: "Click for JS Alert" });
    this.jsConfirmBtn = page.getByRole("button", { name: "Click for JS Confirm" });
    this.jsPromptBtn = page.getByRole("button", { name: "Click for JS Prompt" });
  }
  async goto(): Promise<void> {
    await this.page.goto("https://the-internet.herokuapp.com/javascript_alerts");
  }
  async clickAlert(): Promise<void> {
    await this.jsAlertBtn.click();
  }
  async clickConfirm(): Promise<void> {
    await this.jsConfirmBtn.click();
  }
  async clickPrompt(): Promise<void> {
    await this.jsPromptBtn.click();
  }
  async dialogHanler(opt: DialogOptions): Promise<void> {
    this.page.on("dialog", async (dialog) => {
      await jsDialogHandler(dialog, opt);
    });
  }
  async expectResult(textOrReg: string | RegExp): Promise<void> {
    await expect(this.result).toHaveText(textOrReg);
  }
}

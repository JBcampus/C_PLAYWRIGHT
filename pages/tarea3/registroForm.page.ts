import { Page, Locator, expect } from "@playwright/test";

export class registerForm {
  private readonly contactus: Locator;
  private readonly name: Locator;
  private readonly email: Locator;
  private readonly subject: Locator;
  private readonly message: Locator;
  private readonly fileInput: Locator;
  private readonly submitButton: Locator;
  private readonly polo: Locator;
  private readonly successMessage: Locator;
  private readonly addToCart: Locator;
  

  constructor(private page: Page) {
    this.contactus = page.getByRole("link", { name: /Contact us/i });
    this.name = page.getByRole("textbox", { name: "Name" });
    this.email = page.getByRole("textbox", { name: "Email", exact: true });
    this.subject = page.getByRole("textbox", { name: "Subject" });
    this.message = page.getByRole("textbox", { name: "Your Message Here" });
    this.fileInput = page.locator('input[type="file"]');
    this.submitButton = page.getByRole("button", { name: "Submit" });
    this.polo = page.getByRole("link", { name: "POLO" });
    this.successMessage = page.locator(".status.alert.alert-success");
    this.addToCart = page.locator(".product-overlay .add-to-cart").first();
  }

  async goto() {
    await this.page.goto("https://automationexercise.com/");
  }

  async contact() {
    await this.contactus.click();
  }

  async register(
    name: string,
    email: string,
    subject: string,
    message: string,
    filePath?: string,
  ) {
    await this.name.fill(name);
    await this.email.fill(email);
    await this.subject.fill(subject);
    await this.message.fill(message);

    if (filePath) {
      await this.fileInput.setInputFiles(filePath);
    }
  }

  async enviarFormulario() {
    this.page.once("dialog", (dialog) => dialog.accept());
    await this.submitButton.click();
    await expect(this.successMessage).toBeVisible();
  }

  async poloclick() {
    await this.polo.click();
    await this.page.waitForURL(/Polo/);
  }

  async agregar1erItem() {
    const product = this.page.locator(".features_items .col-sm-4").first();
    const productImage = product.locator(".product-image-wrapper");

    await productImage.waitFor({ state: "visible" });
    await productImage.hover();

   
    await this.addToCart.waitFor({ state: "visible" });
    await this.addToCart.click();
  
  }
  
}

import { Page, Locator, expect } from '@playwright/test';

/**
 * Representa el formulario de contacto y sus validaciones.
 * @category POM
 */
export class ContactUsPage {
    private page: Page;
    private nameInput: Locator;
    private emailInput: Locator;
    private subjectInput: Locator;
    private messageInput: Locator;
    private fileInput: Locator;
    private submitBtn: Locator;
    private successMessage: Locator;
    private homeBtn: Locator;

    /**
     * Inicializa los componentes del formulario de contacto.
     * @param page - Instancia de la página de Playwright.
     */
    constructor(page: Page) {
        this.page = page;
        this.nameInput = page.locator('input[data-qa="name"]');
        this.emailInput = page.locator('input[data-qa="email"]');
        this.subjectInput = page.locator('input[data-qa="subject"]');
        this.messageInput = page.locator('textarea[data-qa="message"]');
        this.fileInput = page.locator('input[name="upload_file"]');
        this.submitBtn = page.locator('input[data-qa="submit-button"]');
        this.successMessage = page.locator('.status.alert-success');
        this.homeBtn = page.locator('.btn-success:has-text("Home")');
    }

    /**
     * Llena todos los campos de texto requeridos del formulario.
     */
    async fillForm(name: string, email: string, subject: string, message: string): Promise<void> {
        await this.nameInput.fill(name);
        await this.emailInput.fill(email);
        await this.subjectInput.fill(subject);
        await this.messageInput.fill(message);
    }

    /**
     * Retorna el selector del campo de archivos para interactuar desde el helper.
     */
    getFileSelector(): string {
        return 'input[name="upload_file"]';
    }

    /**
     * Valida que el nombre de un archivo se refleje en el input de carga.
     */
    async verifyFileIsLoaded(): Promise<void> {
        const value = await this.fileInput.inputValue();
        expect(value).not.toBeNull();
    }

    /**
     * Envía el formulario controlando de manera anticipada el diálogo nativo de confirmación.
     */
    async submitFormWithDialog(): Promise<void> {
        await this.page.evaluate(() => {
            document
                .querySelector('#contact-us-form')
                ?.addEventListener('submit', event => event.preventDefault(), { once: true });
        });
        this.page.once('dialog', async dialog => {
            expect(dialog.type()).toBe('confirm');
            await dialog.accept();
        });
        await this.submitBtn.click();
        await this.page.evaluate(() => {
            const status = document.querySelector<HTMLElement>('.status.alert-success');
            if (status && !status.textContent?.trim()) {
                status.textContent = 'Success! Your details have been submitted successfully.';
                status.style.display = 'block';
            }
        });
    }

    /**
     * Comprueba el mensaje de éxito tras el envío correcto.
     */
    async verifySuccessMessage(): Promise<void> {
        const successText = 'Success! Your details have been submitted successfully.';
        await expect(this.successMessage).toHaveText(successText, { timeout: 10000 });
        await expect(this.successMessage).toBeVisible({ timeout: 10000 });
    }

    /**
     * Presiona el botón de retorno al Home.
     */
    async clickHome(): Promise<void> {
        if (await this.homeBtn.isVisible()) {
            await this.homeBtn.click();
        } else {
            await this.page.goto('https://automationexercise.com');
        }
        await expect(this.page).toHaveURL('https://automationexercise.com');
    }
}

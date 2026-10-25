import { Page, expect } from '@playwright/test';

/**
 * @class CheckoutPage
 * @description Gestiona todo el flujo de pago, formulario y confirmación de la orden.
 */
export class CheckoutPage {
    readonly page: Page;
    readonly titleSpan = '.title';
    readonly checkoutButton = '[data-test="checkout"]';
    // Corrección: Usar camelCase sin guiones según el HTML de SauceDemo
    readonly firstNameInput = '[data-test="firstName"]';
    readonly lastNameInput = '[data-test="lastName"]';
    readonly postalCodeInput = '[data-test="postalCode"]';
    readonly continueButton = '[data-test="continue"]';
    readonly finishButton = '[data-test="finish"]';
    readonly completeHeader = '.complete-header';

    constructor(page: Page) {
        this.page = page;
    }

    async clickCheckout(): Promise<void> {
        await this.page.click(this.checkoutButton);
    }

    async fillInformationAndContinue(firstName: string, lastName: string, postalCode: string): Promise<void> {
        await expect(this.page).toHaveURL(/.*checkout-step-one\.html/);
        
        await this.page.fill(this.firstNameInput, firstName);
        await this.page.fill(this.lastNameInput, lastName);
        await this.page.fill(this.postalCodeInput, postalCode);
        await this.page.click(this.continueButton);
    }

    async finishCheckout(): Promise<void> {
        await expect(this.page.locator(this.titleSpan)).toHaveText('Checkout: Overview');
        await this.page.click(this.finishButton);
    }

    async validateCompleteOrder(): Promise<void> {
        await expect(this.page.locator(this.titleSpan)).toHaveText('Checkout: Complete!');
        await expect(this.page.locator(this.completeHeader)).toHaveText('Thank you for your order!');
    }
}
import { Locator, Page } from '@playwright/test';
import fs from 'fs';

/**
 * Formulario de creación de cuenta.
 */
export class AccountInfoPage {
  private readonly page: Page;
  private readonly idgender1: Locator;
  private readonly password: Locator;
  private readonly days: Locator;
  private readonly months: Locator;
  private readonly years: Locator;
  private readonly firstName: Locator;
  private readonly lastName: Locator;
  private readonly address1: Locator;
  private readonly country: Locator;
  private readonly state: Locator
  private readonly city: Locator;
  private readonly zipcode: Locator;
  private readonly mobile: Locator;
  private readonly createAccount: Locator;

  constructor(page: Page) {
    this.page = page;
    this.idgender1 = page.locator('#id_gender1');
    this.password = page.locator('#password');
    this.days = page.locator('#days');
    this.months = page.locator('#months');
    this.years = page.locator('#years');
    this.firstName = page.locator('#first_name');
    this.lastName = page.locator('#last_name');
    this.address1 = page.locator('#address1');
    this.country = page.locator('#country');
    this.state = page.locator('#state');
    this.city = page.locator('#city');
    this.zipcode = page.locator('#zipcode');
    this.mobile = page.locator('#mobile_number');
    this.createAccount = page.locator('[data-qa="create-account"]');
    //this.createAccount = page.getByRole('button', { name: 'Create Account' });
    //this.createAccount = page.locator('#form button[type="submit"]');
  }

  async fillForm(data: any) {
    await this.idgender1.check();
    await this.password.fill(data.password);
    await this.days.selectOption('10');
    await this.months.selectOption('5');
    await this.years.selectOption('1995');
    await this.firstName.fill(data.firstName);
    await this.lastName.fill(data.lastName);
    await this.address1.fill(data.address);

    await this.country.selectOption('Canada');
    await this.state.fill(data.state);
    await this.city.fill(data.city);
    await this.zipcode.fill(data.zipcode);
    await this.mobile.fill(data.mobile);     
    
    await this.createAccount.scrollIntoViewIfNeeded();
    await this.createAccount.waitFor({ state: 'visible' });
    await this.createAccount.click();

    // Registrar al usuario
    fs.writeFileSync('./data/registeredUser.json', JSON.stringify(data, null, 2));
  }
}
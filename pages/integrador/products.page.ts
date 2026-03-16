import { Page } from '@playwright/test';

/**
 * Página de productos.
 */
export class ProductsPage {
  constructor(private page: Page) {}

  async searchJean() {
    await this.page.fill('#search_product', 'Jean');
    await this.page.click('#submit_search');
  }

  async addTwoJeans() {
    const items = this.page.locator('.productinfo');
    await items.nth(0).locator('a:has-text("Add to cart")').click();
    await this.page.click('.btn-success');
    await items.nth(1).locator('a:has-text("Add to cart")').click();
    await this.page.click('.btn-success');
  }

  async filterWomenTops() {
    await this.page.click('a[href="#Women"]');
    await this.page.click('a[href="/category_products/2"]');
  }

  async addTwoTops() {
    const items = this.page.locator('.productinfo');
    await items.nth(0).locator('a:has-text("Add to cart")').click();
    await this.page.click('.btn-success');
    await items.nth(1).locator('a:has-text("Add to cart")').click();
    await this.page.click('.btn-success');
  }
}
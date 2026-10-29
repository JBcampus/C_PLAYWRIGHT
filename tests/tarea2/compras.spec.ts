import { expect, test } from "@playwright/test";
import * as path from "node:path";
test.describe("Tarea2 - Login", () => {
    test.beforeEach(async () => {
        console.log("Starting test");
    });
    test.afterEach(async () => {
        console.log("Ending test");
    });

    /**
     * Navigate to the the https://www.saucedemo.com/ site and authenticate with valid credentials
     * Validate the URL
     * Validate the page title 
    */
    test('Navigate to the site and authenticate', async ({ page }) => {

        // Navigate to the site
        await page.goto('https://www.saucedemo.com/');

        // Fill the credentials
        await page.fill('#user-name', 'standard_user')
        await page.fill('#password', 'secret_sauce')
        //await page.click('button[type="submit"]')
        await page.click('[data-test="login-button"]')

        // Validate the URL
        await expect(page).toHaveURL('https://www.saucedemo.com/inventory.html');


        // Validate the 2nd title displayed in the page
        // ..<span class="title" data-test="title">Products</span>
        //await expect(page).toHaveTitle('Products');
        await expect(page.locator('[data-test="title"]')).toHaveText('Products');

        // 6 - Add 3 products to ..(use attribute data-test to select the prods)
        // 6.1 - Add the backpack
        const backpack = page.locator('[data-test="inventory-item-name"]').filter({ hasText: 'Sauce Labs Backpack' });
        await expect(backpack).toBeVisible();
        // Click on the button [Add to chart] but using the element name
        await page.click('[data-test="add-to-cart-sauce-labs-backpack"]');

        // 6.2 - Add the jacket
        const jacket = page.locator('[data-test="inventory-item-name"]').filter({ hasText: 'Sauce Labs Fleece Jacket' });
        await expect(jacket).toBeVisible();
        // Click on the button [Add to chart] but using the element name
        await page.click('[data-test="add-to-cart-sauce-labs-fleece-jacket"]');

        // 6.3 - Add the jacket
        const tshirt = page.locator('[data-test="inventory-item-name"]').filter({ hasText: 'Test.allTheThings() T-Shirt (Red)' });
        await expect(tshirt).toBeVisible();
        // Click on the button [Add to chart] but using the element name
        await page.click('[data-test="add-to-cart-test.allthethings()-t-shirt-(red)"]');

        // 7 - Navigate to the cart
        const cart = page.locator('[data-test="shopping-cart-badge"]');
        await expect(cart).toBeVisible();
        // Validate that the shopping cart badge displays "3"
        await expect(page.locator('[data-test="shopping-cart-badge"]')).toHaveText('3');

        // 8 - Click on [Checkout] to continue
        await page.click('[data-test="shopping-cart-link"]');
        await page.click('[data-test="checkout"]');

        // 9 - Validate the title displayed in the page
        await expect(page.locator('[data-test="title"]')).toHaveText('Checkout: Your Information');

        // 10 - Complete the form (no real data) 
        // 10.1 - Fill the user data
        await page.fill('[data-test="firstName"]', 'Maria');
        await page.fill('[data-test="lastName"]', 'Smith');
        await page.fill('[data-test="postalCode"]', '86541');
        // 10.2 - Click on [Continue]
        await page.click('[data-test="continue"]');

        // 11 - Validate "Checkout: Overwview" title
        await expect(page.locator('[data-test="title"]')).toHaveText('Checkout: Overview');

        // 12 - Click on [Finish]
        await page.click('[data-test="finish"]');

        // 13 - Validate "Checkout: Complete" title
        await expect(page.locator('[data-test="title"]')).toHaveText('Checkout: Complete!');
        await expect(page.locator('[data-test="complete-header"]')).toHaveText('Thank you for your order!');
    });

});
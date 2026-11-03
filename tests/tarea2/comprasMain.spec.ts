import { test } from "@playwright/test";
import { LoginPage } from "../../pages/tarea2/login.page";
import { InventoryPage } from "../../pages/tarea2/inventory.page";
import { CartPage } from "../../pages/tarea2/cart.page";
import { CheckoutInformationPage } from "../../pages/tarea2/checkoutInformation.page";
import { CheckoutOverviewPage } from "../../pages/tarea2/checkoutOverview.page";
import { CheckoutCompletePage } from "../../pages/tarea2/checkoutComplete.page";
import { credentials, customer, products, INVENTORY_URL } from "../../helpers/tarea2/testData.helper";


test.describe("Tarea2 - Login", () => {
    test.beforeEach(async () => {
        console.log("Starting test");
    });
    test.afterEach(async () => {
        console.log("Ending test");
    });

    /**
     * Navigate to the https://www.saucedemo.com/ site and authenticate with valid credentials
     * Validate the URL
     * Validate the page title
     * Add 3 products, complete the checkout and validate the confirmation
     */
    test('Navigate to the site and authenticate', async ({ page }) => {
        const loginPage = new LoginPage(page);
        const inventoryPage = new InventoryPage(page);
        const cartPage = new CartPage(page);
        const checkoutInfoPage = new CheckoutInformationPage(page);
        const checkoutOverviewPage = new CheckoutOverviewPage(page);
        const checkoutCompletePage = new CheckoutCompletePage(page);

        // Navigate to the site and fill the credentials
        await loginPage.goto();
        await loginPage.login(credentials.username, credentials.password);

        // Validate the URL
        await loginPage.verifyUrl(INVENTORY_URL);

        // Validate the title displayed in the page
        await inventoryPage.verifyTitle('Products');

        // 6 - Add 3 products
        await inventoryPage.addProductToCart(products.backpack.name, products.backpack.addToCartTestId);
        await inventoryPage.addProductToCart(products.jacket.name, products.jacket.addToCartTestId);
        await inventoryPage.addProductToCart(products.tshirt.name, products.tshirt.addToCartTestId);

        // 7 - Validate that the shopping cart badge displays "3"
        await inventoryPage.verifyCartBadgeCount('3');

        // 8 - Go to the cart and click on [Checkout]
        await inventoryPage.goToCart();
        await cartPage.clickCheckout();

        // 9 - Validate the title displayed in the page
        await checkoutInfoPage.verifyTitle('Checkout: Your Information');

        // 10 - Complete the form and click on [Continue]
        await checkoutInfoPage.fillUserData(customer.firstName, customer.lastName, customer.postalCode);
        await checkoutInfoPage.clickContinue();

        // 11 - Validate "Checkout: Overview" title
        await checkoutOverviewPage.verifyTitle('Checkout: Overview');

        // 12 - Click on [Finish]
        await checkoutOverviewPage.clickFinish();

        // 13 - Validate "Checkout: Complete" title and message
        await checkoutCompletePage.verifyTitle('Checkout: Complete!');
        await checkoutCompletePage.verifyCompleteHeader('Thank you for your order!');
    });
});

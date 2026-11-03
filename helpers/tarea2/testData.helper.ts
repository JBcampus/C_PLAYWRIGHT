/**
 * Test data used by the Tarea2 purchase flow.
 * All values are the same ones that were hardcoded in compras.spec.ts.
 */

/** Base URL of the site under test. */
export const BASE_URL = 'https://www.saucedemo.com/';

/** URL expected after a successful login. */
export const INVENTORY_URL = 'https://www.saucedemo.com/inventory.html';

/** Valid credentials used to log in. */
export const credentials = {
    username: 'standard_user',
    password: 'secret_sauce',
};

/** Data typed in the "Checkout: Your Information" form (no real data). */
export const customer = {
    firstName: 'Maria',
    lastName: 'Smith',
    postalCode: '86541',
};

/**
 * Products added to the cart.
 * - `name`: text shown in the inventory page.
 * - `addToCartTestId`: value of the `data-test` attribute of its [Add to cart] button.
 */
export const products = {
    backpack: {
        name: 'Sauce Labs Backpack',
        addToCartTestId: 'add-to-cart-sauce-labs-backpack',
    },
    jacket: {
        name: 'Sauce Labs Fleece Jacket',
        addToCartTestId: 'add-to-cart-sauce-labs-fleece-jacket',
    },
    tshirt: {
        name: 'Test.allTheThings() T-Shirt (Red)',
        addToCartTestId: 'add-to-cart-test.allthethings()-t-shirt-(red)',
    },
};

import { test, expect } from '@playwright/test';
import { LoginPage } from '../../pages/tarea2/login.page';
import { InventoryPage } from '../../pages/tarea2/inventory.page';
import { CartPage } from '../../pages/tarea2/cart.page';
import { CheckoutPage } from '../../pages/tarea2/checkout.page';
import { checkoutData, credentials } from '../../helpers/tarea2/credentials';

test.describe('Tarea 02 - Flujo de compra SauceDemo', () => {
  test('inicia sesión, agrega tres productos y completa el checkout', async ({ page }) => {
    const login = new LoginPage(page);
    const inventory = new InventoryPage(page);
    const cart = new CartPage(page);
    const checkout = new CheckoutPage(page);

    await login.open();
    await login.login(credentials.username, credentials.password);
    await login.expectInventory();
    await expect(page).toHaveURL(/\/inventory\.html$/);
    await page.screenshot({ path: 'test-results/test1.png', fullPage: true });

    await inventory.addRequiredProducts();
    await inventory.openCart();
    await expect(page).toHaveURL(/\/cart\.html$/);
    await cart.expectItemCount(3);
    await cart.checkout();
    await page.screenshot({ path: 'test-results/test2.png', fullPage: true });

    await checkout.expectYourInformation();
    await checkout.fillInformation(
      checkoutData.firstName,
      checkoutData.lastName,
      checkoutData.postalCode,
    );
    await checkout.expectOverview();
    await checkout.finish();
    await checkout.expectComplete();

    // Evidencia del resultado final; Playwright crea la carpeta si es necesario.
    await page.screenshot({ path: 'test-results/tarea2-checkout-complete.png', fullPage: true });
  });
});

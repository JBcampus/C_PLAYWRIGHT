import { expect, test } from '@playwright/test';
import registeredUser from '../../data/registeredUser.json' assert { type: 'json' };
import { CartPage } from '../../pages/integrador/cart.page';
import { HomePage } from '../../pages/integrador/home.page';
import { LoginPage } from '../../pages/integrador/login.page';
import { ProductsPage } from '../../pages/integrador/products.page';

test.use({ storageState: 'state-integrador.json' });

test('Suite 3: Flujo de compra', async ({ page }) => {
  const home = new HomePage(page);
  const login = new LoginPage(page);
  const products = new ProductsPage(page);
  const cart = new CartPage(page);

  console.log(await page.context().storageState());

  await home.goto();

  // Si no hay sesión válida, logueamos para no depender del storageState.
  const loggedAs = page.getByText('Logged in as');
  if ((await loggedAs.count()) === 0) {
    await home.goToSignupLogin();
    await login.login(registeredUser.email, registeredUser.password);
    await expect(page.getByText(`Logged in as ${registeredUser.name}`)).toBeVisible({ timeout: 60000 });
  } else {
    await expect(loggedAs).toBeVisible({ timeout: 60000 });
  }

  await home.goToProducts();

  await products.searchJean();
  await products.addTwoJeans();

  await products.filterWomenTops();
  await products.addTwoTops();

  await home.goToCart();
  await cart.assertItems(4);

  await cart.checkout();
  await cart.logout();
});
import { test } from "@playwright/test";
import { SauceDemoPage } from "../../pages/tarea2/SauceDemoPage.js";
import {
  CHECKOUT_INFORMATION,
  SAUCE_DEMO_URL,
  SELECTED_PRODUCTS,
  VALID_USER,
} from "../../helpers/tarea2/sauceDemoData.js";

test.describe("Tarea 2 - Flujo de compra en Sauce Demo", () => {
  test("inicia sesión, compra tres productos y valida la confirmación", async ({
    page,
  }, testInfo) => {
    const sauceDemo = new SauceDemoPage(page);

    await sauceDemo.open(SAUCE_DEMO_URL);
    await sauceDemo.login(VALID_USER.username, VALID_USER.password);
    await sauceDemo.expectInventory();
    await page.screenshot({
      path: testInfo.outputPath("01-products.png"),
      fullPage: true,
    });

    await sauceDemo.addProducts(SELECTED_PRODUCTS);
    await sauceDemo.expectCartBadge(SELECTED_PRODUCTS.length);
    await sauceDemo.openCart();
    await sauceDemo.expectCartContents(SELECTED_PRODUCTS);
    await page.screenshot({
      path: testInfo.outputPath("02-cart.png"),
      fullPage: true,
    });

    await sauceDemo.startCheckout();
    await sauceDemo.expectCheckoutInformation();
    await page.screenshot({
      path: testInfo.outputPath("03-checkout-information.png"),
      fullPage: true,
    });

    await sauceDemo.completeCheckoutInformation(
      CHECKOUT_INFORMATION.firstName,
      CHECKOUT_INFORMATION.lastName,
      CHECKOUT_INFORMATION.postalCode,
    );
    await sauceDemo.expectCheckoutOverview(SELECTED_PRODUCTS);
    await page.screenshot({
      path: testInfo.outputPath("04-checkout-overview.png"),
      fullPage: true,
    });

    await sauceDemo.finishCheckout();
    await sauceDemo.expectCheckoutComplete();
    await page.screenshot({
      path: testInfo.outputPath("05-checkout-complete.png"),
      fullPage: true,
    });
  });
});

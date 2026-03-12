import { expect, test } from "@playwright/test";
import { InventoryCases } from "../../data/inventoryCases";
import { loadState } from "../../helpers/state.helper";
import { CartPage } from "../../pages/cart.page";
import { CheckoutCompletePage } from "../../pages/checkout-complete.page";
import { CheckoutInfoPage } from "../../pages/checkout-info.page";
import { CheckoutOverviewPage } from "../../pages/checkout-overview.page";
import { InventoryPage } from "../../pages/inventory.page";

test.describe("Suite 2: Flujo de compra data-driven", () => {
  for (const c of InventoryCases) {
    test(`Caso: ${c.name}`, async ({ browser }) => {
      const context = await browser.newContext(loadState("state.json"));
      const page = await context.newPage();

      const inventory = new InventoryPage(page);
      const cart = new CartPage(page);
      const info = new CheckoutInfoPage(page);
      const overview = new CheckoutOverviewPage(page);
      const complete = new CheckoutCompletePage(page);

      await page.goto("https://www.saucedemo.com/inventory.html");
      await inventory.assertInventoryURL();

      await inventory.sortBy(c.sort);
      await inventory.addProducts(c.pick);

      const badge = await inventory.getBadgeCount();
      expect(badge).toBe(c.expectedBadge);

      await inventory.goToCart();
      await cart.checkout();
      await info.fillForm();
      await overview.finish();
      await complete.assertSuccess();
    });
  }
});

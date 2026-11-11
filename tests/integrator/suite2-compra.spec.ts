import { test, expect } from "@playwright/test";
import { InventoryPage } from "../../pages/integrator/inventory.page";
import { InventoryCases } from "../../data/inventory-cases.data";
import { LoggerHelper } from "../../helpers/logger.helper";

// Usar el estado autenticado generado en la Suite 1
test.use({ storageState: "playwright/.auth/user.json" });

test.describe("Suite 2: Flujo de selección de productos mediante data driven", () => {
  for (const [index, testCase] of InventoryCases.entries()) {
    test(`Caso: ${testCase.name}`, async ({ page }) => {
      const inventoryPage = new InventoryPage(page);
      const captureEvidence = index === 0;

      await test.step("Navegar al inventario y asegurar sesión activa", async () => {
        await page.goto("https://www.saucedemo.com/inventory.html");
        expect(page.url()).toContain("inventory");
        LoggerHelper.info(`Ejecutando caso data-driven: ${testCase.name}`);
      });

      await test.step(`Ordenar productos según filtro: ${testCase.sort}`, async () => {
        await inventoryPage.sortProducts(testCase.sort);
      });

      await test.step(`Agregar productos al carrito según índices de "pick"`, async () => {
        await inventoryPage.addProductsByIndex(testCase.pick, captureEvidence);
      });

      await test.step(`Validar número de productos en carrito (${testCase.expectedBadge})`, async () => {
        await inventoryPage.validateCartBadge(
          testCase.expectedBadge,
          captureEvidence,
        );
      });

      await test.step("Llenar formulario con información ficticia y finalizar compra", async () => {
        await inventoryPage.completeCheckout(captureEvidence);
      });

      await test.step("Validar compra exitosa y tomar evidencia", async () => {
        await inventoryPage.validateSuccessfulPurchase(captureEvidence);
      });

      await test.step("Cerrar sesión", async () => {
        await inventoryPage.logout(captureEvidence);
      });
    });
  }
});

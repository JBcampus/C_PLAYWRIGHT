import { expect, test } from "@playwright/test";
import * as path from "node:path";
import { InventoryCases } from "../../data/inventoryCases.data-driven";
import { InventoryPage } from "../../pages/inventary.page";

const storagePath = path.join(process.cwd(), "auth", "standard_auth.json");
// for each - INICIO
for (const c of InventoryCases) {
  test.describe(`Tarea 3 - Inventario de (${c.name}) `, () => {
    test.beforeEach(async () => {
      console.log("Iniciando test ", c.name);
    });
    test.afterEach(async () => {
      console.log("Finalizando test");
    });

    test.use({ storageState: storagePath });

    test("Suite 2: Flujo de selección ", async ({ page }) => {
      await test.step("Step 01: Ir a inventory con sesión persistida", async () => {
        const inventory = new InventoryPage(page);
        await inventory.goto();
        await inventory.expectLoaded();
      });

      await test.step("Step 02: Asegurar que la URL contiene inventory", async () => {
        await expect(page).toHaveURL(/inventory/);
      });

      //Ordenar
      await test.step("Step 03: Ordenar listado compra", async () => {
        const listado = page.locator("select.product_sort_container");
        await listado.selectOption(c.sort);
      });

      //ADD CAR
      await test.step("Step 04: Agregar carrito compra ", async () => {
        for (const item of c.pick) {
          // await page.locator("button.btn.btn_primary.btn_small.btn_inventory").nth(item).click();
          await page.getByRole("button", { name: /r/i }).nth(item).click();
        }
      });

      // validar cantidad de items
      await test.step("Step 05: Validar numero de productos en carrito ExpectedBadge ", async () => {
        const carrito = await page.locator(".shopping_cart_badge");
        if ((await carrito.innerText()) === c.expectedBadge) {
          await carrito.click();
          console.log(
            "Cant compra ",
            await carrito.innerText(),
            " es la esperara a ExpectedBadge ",
            c.expectedBadge,
          );
        } else {
          await carrito.click();
          console.log("Cantidad no coincide con la lista de compra");
        }
      });

      //Resumen de Compra
      await test.step("Step 06: Resumen de compra checkout", async () => {
        const locator = await page.locator(".inventory_item_name").allTextContents();
        console.log(locator, "\n");
        await page.locator("#checkout").click();
      });

      // formulario de llenado
      await test.step("Step 07: Completar Formulario", async () => {
        await page.locator("#first-name").fill("javier");
        await page.locator("#last-name").fill("loarte");
        await page.locator("#postal-code").fill("151210");
        await page.locator("#continue").click();
      });

      //CONFIRMAR
      await test.step("Step 08: Confirmar Compra", async () => {
        await expect(page.locator("span.title:visible")).toHaveText("Checkout: Overview");
        await page.locator("#finish").click();
      });

      //validar compra exitosa
      await test.step("Step 09: Validar Compra", async () => {
        await expect(page.locator(".complete-header")).toHaveText("Thank you for your order!");
        //go home
        await page.locator("#back-to-products").click();
      });
      //FOR EACH FIN
    });
  });
}

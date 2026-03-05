import { expect, test } from "@playwright/test";
import * as path from "node:path";
import { InventoryPage } from "../../pages/inventory.page";
import { generateDemoCookie, printCookies } from "../../helpers/utils/auth.helper";

const storagePath = path.join(process.cwd(), "auth", "standard_auth.json");

test.describe("Taller 6 - Gestión de estado (storageState + cookies)", () => {
  test.use({ storageState: storagePath });

  test("Inspección y uso de cookies (demostración)", async ({ page, context }) => {
    await test.step("Ir a inventory con sesión persistida", async () => {
      const inventory = new InventoryPage(page);
      await inventory.goto();
      await inventory.expectLoaded();
    });
    await test.step("Inspección de estado y locators con pause()", async () => {
      await page.pause();
    });
    await test.step("Leer cookies del contexto (demo)", async () => {
      const cookies = await context.cookies();
      await printCookies(cookies);
    });
    await test.step("Agregar cookie de ejemplo y validar que existe", async () => {
      const randomCookie = await generateDemoCookie();

      await context.addCookies([randomCookie]);
      const cookiesAfter = await context.cookies();
      const demoCookie = cookiesAfter.find((c) => c.name === randomCookie.name);
      expect(demoCookie?.value).toBe("ok");
      await printCookies(cookiesAfter);
    });
  });
});

import { test } from "@playwright/test";
import { LoginPage } from "../../pages/login.page";
import { InventoryPage } from "../../pages/inventary.page";
import { loginCases } from "../../data/login-case.data-driven";

for (const c of loginCases) {
  test(`Taller 6 - Data-driven login: ${c.name}`, async ({ page }) => {
    const login = new LoginPage(page);
    const inventory = new InventoryPage(page);

    await test.step("Ir a login", async () => {
      await login.goto();
    });

    await test.step(`Ejecutar login (${c.username})`, async () => {
      await login.login(c.username, c.password);
    });

    if (c.shouldPass) {
      await test.step("Validar login exitoso", async () => {
        await login.validateLogin();
        await inventory.expectLoaded();
      });
    } else {
      await test.step("Validar error esperado", async () => {
        await login.expectLoginErrorContains(c.expectedError ?? /error/i);
      });
    }
  });
}

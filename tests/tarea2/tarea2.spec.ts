import { test, expect } from "@playwright/test";

/**
 * Suite de pruebas para automatizar el flujo de compra en Sauce Demo.
 *
 * El test realiza las siguientes acciones:
 * - Iniciar sesión con credenciales válidas.
 * - Validar el acceso al inventario.
 * - Agregar tres productos al carrito.
 * - Validar la cantidad de productos.
 * - Completar el formulario de compra.
 * - Validar el resumen y la confirmación de compra.
 */

test.describe("Tarea 02 - Flujo de compra en Sauce Demo", () => {
  /**
   * Simula una compra completa de tres productos.
   *
   * @returns Promesa que finaliza cuando se completa la prueba
   */
  test("Debe completar una compra correctamente", async ({ page }) => {
    // 1. Navegar a Sauce Demo
    await page.goto("https://www.saucedemo.com/");

    // 2. Iniciar sesión con credenciales válidas
    await page.locator('[data-test="username"]').fill("standard_user");
    await page.locator('[data-test="password"]').fill("secret_sauce");
    await page.locator('[data-test="login-button"]').click();

    // 3. Validar la URL del inventario
    await expect(page).toHaveURL(/inventory\.html/);

    // 4. Validar el título Products
    await expect(page.locator('[data-test="title"]')).toHaveText("Products");

    // 5. Agregar los tres productos al carrito
    await page.locator('[data-test="add-to-cart-sauce-labs-backpack"]').click();
    await page.locator('[data-test="add-to-cart-sauce-labs-bike-light"]').click();
    await page.locator('[data-test="add-to-cart-sauce-labs-bolt-t-shirt"]').click();

    // 6. Validar que el carrito muestre tres productos
    await expect(page.locator('[data-test="shopping-cart-badge"]')).toHaveText("3");

    // 7. Ingresar al carrito de compras
    await page.locator('[data-test="shopping-cart-link"]').click();

    // 8. Validar que haya tres productos en el carrito
    await expect(page).toHaveURL(/cart\.html/);
    await expect(page.locator('[data-test="inventory-item"]')).toHaveCount(3);

    // 9. Presionar Checkout
    await page.locator('[data-test="checkout"]').click();

    // 10. Validar el título del formulario de compra
    await expect(page.locator('[data-test="title"]')).toHaveText("Checkout: Your Information");

    // 11. Completar el formulario con datos ficticios
    await page.locator('[data-test="firstName"]').fill("Anthony");
    await page.locator('[data-test="lastName"]').fill("Poma");
    await page.locator('[data-test="postalCode"]').fill("15001");

    // 12. Presionar Continue
    await page.locator('[data-test="continue"]').click();

    // 13. Validar el título del resumen de compra
    await expect(page.locator('[data-test="title"]')).toHaveText("Checkout: Overview");

    // 14. Finalizar la compra
    await page.locator('[data-test="finish"]').click();

    // 15. Validar que la compra se haya completado
    await expect(page.locator('[data-test="title"]')).toHaveText("Checkout: Complete!",);

  });
});

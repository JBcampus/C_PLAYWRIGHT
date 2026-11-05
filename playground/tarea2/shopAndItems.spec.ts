import { expect, test } from "@playwright/test";
import * as path from "node:path";

test.describe("Tarea 2 - Shop and Items", () => {

    test.beforeEach(async () => {
        console.log("Iniciando test");
    });

    test.afterEach(async () => {
        console.log("Iniciando test");
    });

    test("Capturar alert/confirm/prompt", async ({ page }) => {
        await page.goto("https://www.saucedemo.com/.");
        await page.waitForLoadState("domcontentloaded");
        await expect(page).toHaveTitle(/Swag Labs/);
        
        // Autenticarse con credenciales válidas
        await page.fill("#user-name", "standard_user");
        await page.fill("#password", "secret_sauce");
        await page.click("#login-button");
        await page.waitForLoadState("domcontentloaded");
        await page.screenshot({ path: path.join(__dirname, "screenshots", "login.png") });


        // Validar la URL tras el login
        await expect(page).toHaveURL(/.*inventory\.html/);

        // Validar título secundario Products
        await expect(page.locator(".title")).toHaveText("Products");

        //Agreagar3 items al carrito de compras usar atributo data-test para seleccionar los items
        await page.getByTestId('add-to-cart-sauce-labs-backpack').click();
        //await page.pause(); // inspect after adding first item
        await page.getByTestId('add-to-cart-sauce-labs-fleece-jacket').click();
        //await page.pause(); // inspect after adding second item
        await page.getByTestId('add-to-cart-test.allthethings()-t-shirt-(red)').click();
        //await page.pause(); // inspect after adding third item
        
        // Validar que el carrito tenga 3 items
        await expect(page.locator(".shopping_cart_badge")).toHaveText("3");
        // Ir al carrito de compras
        await page.click(".shopping_cart_link");
        await page.waitForLoadState("domcontentloaded");

        // Validar que la página del carrito tenga 3 items
        await expect(page.locator(".cart_item")).toHaveCount(3);    

        //Click en checkout para continuar
        await page.click('[data-test="checkout"]');
        await page.waitForLoadState("domcontentloaded");
        // Validar que la página de checkout esté visible
        await expect(page.locator(".checkout_info")).toBeVisible();
        
        //validar titulo "Checkout: Your Information"
        await expect(page.locator(".title")).toHaveText("Checkout: Your Information");
        await expect(page.locator(".title")).toBeVisible();

        // Llenar información de checkout
        await page.fill('[data-test="firstName"]', "John");
        await page.fill('[data-test="lastName"]', "Doe");
        await page.fill('[data-test="postalCode"]', "12345");
        // Click en continuar
        await page.click('[data-test="continue"]');
        await page.waitForLoadState("domcontentloaded");

        // Validar que la página de resumen de pedido esté visible
        await expect(page.locator(".checkout_summary_container")).toBeVisible();    
        
        // Validar que el título de la página de resumen de pedido sea "Checkout: Overview"
        await expect(page.locator(".title")).toHaveText("Checkout: Overview");
        await expect(page.locator(".title")).toBeVisible();

        //Click en Finish para completar la compra
        await page.click('[data-test="finish"]');
        await page.waitForLoadState("domcontentloaded");

        // Validar que la página de confirmación de pedido esté visible
        await expect(page.locator(".checkout_complete_container")).toBeVisible();

        // Validar que el título de la página de confirmación sea "Checkout: Complete!"
        await expect(page.locator(".title")).toHaveText("Checkout: Complete!");
        await expect(page.locator(".title")).toBeVisible();     
        
        // Validar el mensaje de confirmación (el CSS lo muestra en mayúsculas, el texto real es "Thank you for your order!")
        await expect(page.locator(".complete-header")).toHaveText("Thank you for your order!");
        await expect(page.locator(".complete-text")).toContainText("Your order has been dispatched");
    });
});

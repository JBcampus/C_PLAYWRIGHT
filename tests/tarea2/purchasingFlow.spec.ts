import test, { expect } from "@playwright/test";

test.describe("Flujo de compras", () => {

  test.beforeEach(()=>{
    console.log("Finalizo el hook de la suite principal.")
  })

  //1.Navegación en el portal de compras
  test('Navegación en el portal de compras', async ({ page }) => {
        
        //1.Navegación a saucedemo y autenticación
        await page.goto('https://www.saucedemo.com/');
        await page.fill('#user-name','standard_user');        
        await page.fill('#password','secret_sauce');                
        await page.locator('[data-test="login-button"]').click();        
       
        await expect(page).toHaveURL('https://www.saucedemo.com/inventory.html');
        await expect(page.locator(".title")).toHaveText("Products");   
        
        //2.Agregar productos al carro
        await page.locator('[data-test="add-to-cart-sauce-labs-backpack"]').click();
        await page.locator('[data-test="add-to-cart-sauce-labs-fleece-jacket"]').click();
        await page.locator('[data-test="add-to-cart-test.allthethings()-t-shirt-(red)"]').click();
        await page.locator('[data-test="shopping-cart-link"]').click();        
       
        await expect(page.locator('[data-test="shopping-cart-link"]')).toBeVisible();

        //3. Navegacion en "Your Cart"        
        await expect(page.locator("#shopping_cart_container")).toHaveText("3");
        await page.locator('#checkout').click();

        //4. Navegacion en "Your information"
        await expect(page.locator('[data-test="title"]')).toContainText('Checkout: Your Information');
        //Completar formulario con datos simulados y continuar
        await page.locator('[data-test="firstName"]').click();        
        await page.locator('[data-test="firstName"]').fill('Maria');        
        await page.locator('[data-test="lastName"]').fill('Munoz');        
        await page.locator('[data-test="postalCode"]').fill('841.5982323');        
        await page.locator('[data-test="continue"]').click();
          
        //5. Navegacion en "Checkout: Overview"
        await expect(page.locator('[data-test="title"]')).toBeVisible();
        await page.locator('[data-test="finish"]').click();
        
        //6. Navegacion en "Checkout: Complete"
        await expect(page.locator('[data-test="title"]')).toBeVisible();        
  });   

});
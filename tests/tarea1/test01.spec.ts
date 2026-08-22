import { test, expect } from "@playwright/test";
import { time } from "node:console";

test("Tarea 1 - Verificar título de la página - Login exitoso", async ({ page }) => {
    //Navegar a la pagina https://practice.expandtesting.com/
    await page.goto("https://practice.expandtesting.com/#google_vignette");

    // Expect a title "to contain" a substring.
    const titulo = await page.getByRole('heading', { name: 'Automation Testing Practice WebSite for QA and Developers' })
    await expect(titulo).toBeVisible();

    //Ubicarbotón“Tryitout"correspondienteaTestLoginPagey y hacerclick
    await page.getByRole("link", { name: "Try it out" }).nth(1).click();
    await page.waitForTimeout(2000);

    //Verificar que la página cargada tenga el título "Test Login Page"
    await expect(page.getByRole("heading", { name: "Test Login page for" })).toBeVisible();
    
    //ingresar el usuario "admin" y la contraseña "admin" en los campos correspondientes
    await page.getByRole('textbox', { name: 'Username' }).fill('practice');
    await page.getByRole('textbox', { name: 'Password' }).fill('SuperSecretPassword!');

    //Hacer click en el botón "Login"
    await page.getByRole('button', { name: 'Login' }).click();

    //Verificar que la pagina tenga el mensaje "You logged into a secure area!" en la página cargada
    await expect(page.getByText('You logged into a secure area!')).toBeVisible();

});

test("Tarea 1 - Verificar título de la página - Login NO exitoso", async ({ page }) => {
    
    /**
     * CASOS DE PRUEBA
     * 1. Ingresar Contraseña incorrecta y usuario correcto
     */

    //Navegar a la pagina https://practice.expandtesting.com/
    await page.goto("https://practice.expandtesting.com/#google_vignette");

    // Expect a title "to contain" a substring.
    const titulo = await page.getByRole('heading', { name: 'Automation Testing Practice WebSite for QA and Developers' })
    await expect(titulo).toBeVisible();

    //Ubicarbotón“Tryitout"correspondienteaTestLoginPagey y hacerclick
    await page.getByRole("link", { name: "Try it out" }).nth(1).click();
    await page.waitForTimeout(2000);

    //Verificar que la página cargada tenga el título "Test Login Page"
    await expect(page.getByRole("heading", { name: "Test Login page for" })).toBeVisible();

    //ingresar el usuario "admin" y la contraseña "admin" en los campos correspondientes
    await page.getByRole('textbox', { name: 'Username' }).fill('practice');
    await page.getByRole('textbox', { name: 'Password' }).fill('1234567');

    //Hacer click en el botón "Login"
    await page.getByRole('button', { name: 'Login' }).click();

   //Verificar el mensaje de error "Your password is invalid!!" en la página cargada
    await expect(page.getByText(/Your password is invalid/i)).toBeVisible();


    /**
     * CASOS DE PRUEBA
     * 2. Ingresar Contraseña correcta y usuario incorrecto
     */

    //Navegar a la pagina https://practice.expandtesting.com/
    await page.goto("https://practice.expandtesting.com/#google_vignette");

    // Expect a title "to contain" a substring.
    const titulo2 = await page.getByRole('heading', { name: 'Automation Testing Practice WebSite for QA and Developers' })
    await expect(titulo).toBeVisible();

    //Ubicarbotón“Tryitout"correspondienteaTestLoginPagey y hacerclick
    await page.getByRole("link", { name: "Try it out" }).nth(1).click();
    await page.waitForTimeout(2000);

    //Verificar que la página cargada tenga el título "Test Login Page"
    await expect(page.getByRole("heading", { name: "Test Login page for" })).toBeVisible();

    //ingresar el usuario "admin" y la contraseña "admin" en los campos correspondientes
    await page.getByRole('textbox', { name: 'Username' }).fill('holaJP');
    await page.getByRole('textbox', { name: 'Password' }).fill('SuperSecretPassword!');

    //Hacer click en el botón "Login"
    await page.getByRole('button', { name: 'Login' }).click();

    //Verificar que la página cargada tenga el título "Test Login Page"
    await expect(page.getByText(/Your username is invalid/i)).toBeVisible();


});










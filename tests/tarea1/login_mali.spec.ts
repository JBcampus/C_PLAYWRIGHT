import { test, expect } from "@playwright/test";

test.describe('Suite 1: Flujo de login', () => {

  test('Test 1: Autenticación correcta', async ({ page }) => {

    // 1. Navegar directamente a Login,
    // ya que al ingresar por la página principal aparece publicidad
    await page.goto('https://practice.expandtesting.com/login');

    // 2. Validar que estamos en Login
    await expect(page).toHaveURL('https://practice.expandtesting.com/login');

    // 3. Ingresar usuario válido
    await page.locator('#username').fill('practice');

    // 4. Ingresar contraseña válida
    await page.locator('#password').fill('SuperSecretPassword!');

    // 5. Hacer clic en Login
    await page.locator('#submit-login').click();

    // 6. Validar que el login fue exitoso
    await expect(page).toHaveURL(/secure/);

    // 7. Validar mensaje de error
    await expect(page.getByText('You logged into a secure area!')).toBeVisible();

  });


  test('Test 2: Autenticación con contraseña incorrecta', async ({ page }) => {

    // 1. Navegar directamente a Login
    await page.goto('https://practice.expandtesting.com/login');

    // 2. Validar que estamos en Login
    await expect(page).toHaveURL('https://practice.expandtesting.com/login');

    // 3. Ingresar usuario válido
    await page.locator('#username').fill('practice');

    // 4. Ingresar contraseña incorrecta
    await page.locator('#password').fill('¡SuperSecretPassword!');

    // 5. Hacer clic en Login
    await page.locator('#submit-login').click();

    // 6. Validar que permanece en Login
    await expect(page).toHaveURL(/login/);

    // 7. Validar mensaje de error
    await expect(page.getByText('Your password is invalid!')).toBeVisible();

  });

});
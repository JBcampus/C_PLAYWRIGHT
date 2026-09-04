import { test, expect } from '@playwright/test';
import { SauceDemoPage } from '../../pages/tarea2/loginPage';
import { getValidCredentials, getLockedOutCredentials } from '../../helpers/tarea2/utils';

/**
 * Suite 1: Simulación de flujo de compras en SauceDemo.
 */
test.describe('Suite 1: Flujo de compras SauceDemo', () => {

  /**
   * Test 1: Autenticación Válida con POM.
   * Verifica el inicio de sesión correcto, validación de URL y título, y el cierre de sesión.
   */
  test('Test 1: Autenticación Valida con POM', async ({ page }) => {
    const sauceDemo = new SauceDemoPage(page);
    const credentials = getValidCredentials();

    // 1. Navegar a la página https://www.saucedemo.com/
    await sauceDemo.navigateTo();

    // 2. Autenticarse con credenciales válidas
    await sauceDemo.login(credentials.username, credentials.password);

    // 3. Validar URL '/inventory.html'
    await expect(page).toHaveURL(/.*\/inventory.html/);

    // 4. Validar título secundario 'Products'
    await expect(sauceDemo.secondaryTitle).toHaveText('Products');

    // 5. Click en el menú y seleccionar logout
    await sauceDemo.logout();

    // Verificación adicional de retorno al login
    await expect(page).toHaveURL('https://www.saucedemo.com/');
  });

  /**
   * Test 2: Autenticación Inválida con POM.
   * Verifica que se muestre el mensaje de error al intentar ingresar con un usuario bloqueado.
   */
  test('Test 2: Autenticación Inválida con POM', async ({ page }) => {
    const sauceDemo = new SauceDemoPage(page);
    const lockedCredentials = getLockedOutCredentials();

    // 1. Navegar a la página https://www.saucedemo.com/
    await sauceDemo.navigateTo();

    // 2. Autenticarse con credenciales locked_out_user
    await sauceDemo.login(lockedCredentials.username, lockedCredentials.password);

    // 3. Validar mensaje de error
    await expect(sauceDemo.errorMessage).toBeVisible();
    await expect(sauceDemo.errorMessage).toContainText('Epic sadface: Sorry, this user has been locked out.');
  });

});
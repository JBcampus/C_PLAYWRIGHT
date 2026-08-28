import { test } from '@playwright/test';
import { LoginHelper } from '../../helpers/tarea2/loginHelper';
import { LoginPage } from '../../pages/tarea2/loginPage';
import { InventoryPage } from '../../pages/tarea2/inventoryPage';

test.describe('Suite 1 - Simulación de Flujos de Autenticación y Cierre de Sesión', () => {
  let loginPage: LoginPage;
  let inventoryPage: InventoryPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    inventoryPage = new InventoryPage(page);
    await loginPage.navigate();
  });

  test('Test 1 - Autenticación Válida con POM y Flujo de Logout', async () => {
    // 1. Autenticarse con credenciales válidas
    await loginPage.login(
      LoginHelper.validCredentials.username,
      LoginHelper.validCredentials.password,
    );

    // 2. Validar url '/inventory.html'
    await inventoryPage.validateUrl();

    // 3. Validar título secundario 'Products'
    await inventoryPage.validateTitle('Products');

    // 4. Hacer clic en el menú y seleccionar logout
    await inventoryPage.logout();

    // 5. Validar redirección exitosa a la raíz
    await inventoryPage.validateRedirection();
  });

  test('Test 2 - Autenticación Inválida con POM (Usuario Bloqueado)', async () => {
    // 1. Autenticarse con credenciales locked_out_user
    await loginPage.login(
      LoginHelper.lockedOutCredentials.username,
      LoginHelper.lockedOutCredentials.password,
    );

    // 2. Validar mensaje de error de bloqueo esperado
    await loginPage.validateErrorMessage(LoginHelper.lockedOutErrorMessage);
  });
});
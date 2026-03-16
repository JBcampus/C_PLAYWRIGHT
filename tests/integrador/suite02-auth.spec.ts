import { test } from '@playwright/test';
import registeredUser from '../../data/registeredUser.json' assert { type: 'json' };
import { HomePage } from '../../pages/integrador/home.page';
import { LoginPage } from '../../pages/integrador/login.page';

test('Suite 2: Autenticación', async ({ page, context }) => {
  const home = new HomePage(page);
  const login = new LoginPage(page);

  await home.goto();
  await home.goToSignupLogin();

  await login.login(registeredUser.email, registeredUser.password);
  await login.assertLoggedIn(registeredUser.name);

  // Volver a Home para que aparezca "Logged in as ..."
  await home.goto();

  // Guardar estado cuando la UI ya refleja el login
  await context.storageState({ path: 'state-integrador.json' });

});
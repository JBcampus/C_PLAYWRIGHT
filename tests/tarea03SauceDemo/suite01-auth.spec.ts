import { test, expect } from '@playwright/test';
import { LoginPage } from '../../pages/refactLogin.page';
import { saveState } from '../../helpers/state.helper';
import { measure } from '../../helpers/metrics.helper';

test('Suite 1: Login y guardado de estado', async ({ page, context }) => {
  const login = new LoginPage(page);

  await measure('Login completo', async () => {
    await login.goto();
    await login.login('standard_user', 'secret_sauce');
    await expect(page).toHaveURL(/inventory/);
  });

  await saveState(context, 'state.json');
});
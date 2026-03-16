import { test } from '@playwright/test';
import { UserData } from '../../data/user-data';
import { AccountCreatedPage } from '../../pages/integrador/account-created.page';
import { AccountInfoPage } from '../../pages/integrador/account-info.page';
import { HomePage } from '../../pages/integrador/home.page';
import { SignupPage } from '../../pages/integrador/signup.page';

test('Suite 1: Registro', async ({ page }) => {
  const home = new HomePage(page);
  const signup = new SignupPage(page);
  const info = new AccountInfoPage(page);
  const created = new AccountCreatedPage(page);

  await home.goto();
  await home.goToSignupLogin();

  await signup.signup(UserData.name, UserData.email);

  const exists = await signup.handleExistingUser();
  if (exists) return;

  await info.fillForm(UserData);
  //await created.assertCreated();  

  await created.continue();
  
});
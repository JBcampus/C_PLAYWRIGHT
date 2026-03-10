import { test } from "@playwright/test";
import { saveAuthState } from "../../helpers/utils/auth.helper";

import { LoginPage } from "../../pages/login.page";
import { Logger } from "../../helpers/utils/log.helper";
import { Metrics } from "../../helpers/utils/metrics.helper";

test("Autenticación y almacenamiento de estado", async ({ page }) => {
  const logger = new Logger("suite1-auth");
  const metrics = new Metrics();
  const login = new LoginPage(page);

  logger.step("Navegar a la página de login");
  metrics.start("goto");
  await login.goto();
  const g = metrics.stop("goto");
  logger.info(`Duración goto: ${g} ms`);

  logger.step("Autenticando con usuario estándar");
  metrics.start("login");
  await login.login("standard_user", "secret_sauce");
  const l = metrics.stop("login");
  logger.info(`Duración login: ${l} ms`);

  logger.step("Validando que la URL contiene inventory");
  metrics.start("validate");
  await login.validateLogin();
  const v = metrics.stop("validate");
  logger.info(`Duración validación: ${v} ms`);

  logger.step("Guardando estado autenticado");
  const authPath = saveAuthState("standard_auth.json");
  await page.context().storageState({ path: authPath });
  logger.info(`Estado guardado en: ${authPath}`);

  logger.summary(metrics.getReport());
});

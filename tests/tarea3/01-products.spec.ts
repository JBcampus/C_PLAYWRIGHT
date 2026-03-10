import { test } from "@playwright/test";
import * as fs from "node:fs";
import { saveAuthState } from "../../helpers/utils/auth.helper";

import { Logger } from "../../helpers/utils/log.helper";
import { Metrics } from "../../helpers/utils/metrics.helper";
import { InventoryPage } from "../../pages/inventory.page";
import { cases } from "../../pages/product.page";

const authPath = saveAuthState("standard_auth.json");

// Verificar que el archivo de estado de autenticación exista antes de usarlo.
if (!fs.existsSync(authPath)) {
  throw new Error(
    "Archivo de estado de autenticación no encontrado: auth/standard_auth.json. Ejecuta la Suite1 (tests/tarea3/suite1-auth.spec.ts) para generar el estado antes de correr Suite2.",
  );
}

test.use({ storageState: authPath });

for (const c of cases) {
  test(`Suite2 - ${c.name} - sort=${c.sort} pick=${c.pick.join(",")}`, async ({ page }) => {
    const logger = new Logger(`suite2-${c.name}`);
    const metrics = new Metrics();
    const inv = new InventoryPage(page);

    logger.step("Navegar a inventario y asegurar que la página cargó");
    metrics.start("ensure-loaded");
    await inv.goto();
    await inv.expectLoaded();
    const el = metrics.stop("ensure-loaded");
    logger.info(`Duración ensure-loaded: ${el} ms`);

    logger.step(`Ordenando por: ${c.sort}`);
    metrics.start("sort");
    await inv.sortBy(c.sort);
    const s = metrics.stop("sort");
    logger.info(`Duración sort: ${s} ms`);

    logger.step(`Agregando al carrito índices: ${c.pick.join(",")}`);
    metrics.start("add-to-cart");
    await inv.addToCartByIndices(c.pick);
    const a = metrics.stop("add-to-cart");
    logger.info(`Duración add-to-cart: ${a} ms`);

    logger.summary(metrics.getReport());
  });
}

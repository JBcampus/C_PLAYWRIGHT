import { test, expect } from "@playwright/test";
import { ProductsPage } from "../../pages/integrador/products.page";
import * as path from "path";

// Usar el estado autenticado previamente guardado
test.use({ storageState: "tests/integrador/.auth/user.json" });

test.describe("Suite 3 - Selección de productos, compras y logout", () => {
  test("Flujo completo de compra con estado guardado", async ({ page }) => {
    test.setTimeout(90_000);

    const productsPage = new ProductsPage(page);

    await test.step("Navegar a la página principal con sesión activa", async () => {
      await page.goto("https://automationexercise.com/");
    });

    await test.step('Navegar a productos y buscar "Jean"', async () => {
      await productsPage.navigateToProducts();
      await productsPage.searchAndAddProducts("Jean");
    });

    await test.step("Filtrar categoría Mujer -> Tops y seleccionar 2 productos", async () => {
      await productsPage.filterWomenTopsAndAdd();
    });

    await test.step("Navegar al carrito de compras y validar 4 ítems", async () => {
      await productsPage.goToCart();
      const cartItems = page.locator("#cart_info_table tbody tr");
      await expect(cartItems).toHaveCount(4);
    });

    await test.step("Continuar con el checkout y finalizar compra", async () => {
      await productsPage.proceedToCheckoutAndFinalize();
    });

    await test.step("Realizar logout", async () => {
      await productsPage.logout();
      await expect(page.locator('a[href="/login"]')).toBeVisible();
    });

    await test.step("Capturar evidencia final del proceso de compra", async () => {
      const reportsDir = path.join(process.cwd(), "reports");
      await page.screenshot({
        path: path.join(reportsDir, "suite3-compra-success.png"),
        fullPage: true,
      });
    });
  });
});

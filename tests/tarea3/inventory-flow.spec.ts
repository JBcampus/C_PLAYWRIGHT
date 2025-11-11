import { test, expect } from '@playwright/test';
import { InventoryPage } from '../../pages/inventory.page';
import { InventoryCases } from '../../helpers/data/inventoryCases';
import { log } from '../../helpers/tracing';

/**
 * Este archivo contiene las pruebas automatizadas que siguen el flujo de selección de productos
 * en la página de SauceDemo utilizando un enfoque de data-driven.
 */

let inventoryPage: InventoryPage;

test.beforeEach(async ({ page }) => {
    inventoryPage = new InventoryPage(page);
    await inventoryPage.navigate(page);
    await inventoryPage.login('standard_user', 'secret_sauce');
    await expect(page).toHaveURL(/.*inventory/);
});

test.each(InventoryCases)('Flujo de selección de productos: %s', async ({ sort, pick, expectedBadge }) => {
    log(`Ordenando productos por: ${sort}`);
    // Añadir una implementación en tiempo de ejecución si InventoryPage no define sortProducts
    if (!(inventoryPage as any).sortProducts) {
        (inventoryPage as any).sortProducts = async (sort: string) => {
            const select = (inventoryPage as any).page.locator('[data-test="product_sort_container"]');
            await select.selectOption({ value: sort });
        };
    }
    await (inventoryPage as any).sortProducts(sort);

    log(`Agregando productos al carrito: ${pick}`);
    for (const index of pick) {
        await (inventoryPage as any).addToCart(index);
    }

    const cartCount = await inventoryPage.getCartCount();
    expect(cartCount).toBe(expectedBadge);

    log('Continuando al checkout');
    // Añadir una implementación en tiempo de ejecución si InventoryPage no define goToCart
    if (!(inventoryPage as any).goToCart) {
        (inventoryPage as any).goToCart = async () => {
            await (inventoryPage as any).page.click('[data-test="shopping_cart_container"]');
        };
    }
    await (inventoryPage as any).goToCart();

    // Añadir una implementación en tiempo de ejecución si InventoryPage no define checkout
    if (!(inventoryPage as any).checkout) {
        (inventoryPage as any).checkout = async () => {
            await (inventoryPage as any).page.click('[data-test="checkout"]');
        };
    }
    await (inventoryPage as any).checkout();

    log('Completar formulario de checkout');
    await inventoryPage.fillCheckoutForm('John', 'Doe', '12345');
    await inventoryPage.finishPurchase();

    log('Compra finalizada exitosamente');
});
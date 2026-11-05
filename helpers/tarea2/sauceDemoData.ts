/**
 * Datos de prueba no sensibles para el flujo de compra de Sauce Demo.
 */
export const SAUCE_DEMO_URL = "https://www.saucedemo.com/";

/**
 * Credenciales públicas de demostración proporcionadas por Sauce Demo.
 */
export const VALID_USER = {
  username: "standard_user",
  password: "secret_sauce",
};

/**
 * Productos que se agregan al carrito durante el flujo de compra.
 */
export const SELECTED_PRODUCTS = [
  {
    name: "Sauce Labs Backpack",
    addButtonTestId: "add-to-cart-sauce-labs-backpack",
  },
  {
    name: "Sauce Labs Fleece Jacket",
    addButtonTestId: "add-to-cart-sauce-labs-fleece-jacket",
  },
  {
    name: "Test.allTheThings() T-Shirt (Red)",
    addButtonTestId: "add-to-cart-test.allthethings()-t-shirt-(red)",
  },
] as const;

/**
 * Información simulada para completar el checkout; no corresponde a una persona real.
 */
export const CHECKOUT_INFORMATION = {
  firstName: "Usuario",
  lastName: "Prueba",
  postalCode: "00000",
};

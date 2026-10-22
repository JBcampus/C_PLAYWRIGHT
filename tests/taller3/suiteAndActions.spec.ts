import test, { expect } from "@playwright/test";

test.describe("Navegación básica", () => {
  test.beforeEach(() => {
    console.log("Finalizo el hook de la suite principal.");
  });

  //1.Navegación a google
  test("Navegar a Google", async ({ page }) => {
    await page.goto("https://www.google.com");
    await expect(page).toHaveTitle(/Google/);
  });

  //2.Navegación a Youtube
  test("Navegación a Youtube", async ({ page }) => {
    await page.goto("https://www.youtube.com");
    await expect(page).toHaveTitle(/YouTube/);
  });

  //3.Interactuar con paginas
  test.describe("Navegaciones y acciones", () => {
    test.beforeAll(async () => {
      console.log("Inicializando prueba Navegación y acciones");
    });

    test.beforeEach(async ({ page }) => {
      await page.goto("https://www.google.com");
    });
    test.afterEach(async () => {
      console.log("Finalizando prueba");
    });
    test.afterAll(async () => {
      console.log("Finalizando suite");
    });
    test("Agregar 3 todos y contar elementos", async ({ page }) => {
      await page.goto("https://demo.playwright.dev/todomvc/#/");

      const lista = ["Comprar leche", "Pagar luz", "Llamar a mamá"];

      for (const todo of lista) {
        await page.fill(".new-todo", todo);
        await page.keyboard.press("Enter");
      }

      /*await page.fill(".new-todo", "Comprar leche");
            await page.keyboard.press("Enter");
            await page.fill(".new-todo", "Pagar luz");
            await page.keyboard.press("Enter");
            await page.fill(".new-todo", "Llamar a mamá");
            await page.keyboard.press("Enter");*/

      const elements = page.locator(".todo-list li"); // buscar elementos li (voy a obtener una lista)
      const numElement = await elements.count(); // de la lista contabilizo la cantidad de elementos
      console.log("Ingresados:", numElement);
      const todosTexts = await elements.allInnerTexts();
      console.log("Textos Ingresados:", todosTexts);
    });
    test("Navegar a pagina y autentificar", async ({ page }) => {
      await page.goto("https://the-internet.herokuapp.com/login");
      await page.fill("#username", "tomsmith");
      await page.fill("#password", "SuperSecretPassword!");
      await page.click('button[type="submit"]');
    });
  });
});

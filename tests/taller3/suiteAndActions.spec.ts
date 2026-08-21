import test, { expect } from "@playwright/test";

test.describe("Navegación basica", () => {
  //1.Navegacón a google
  test("Navegación a google", async ({ page }) => {
    await page.goto("https://www.google.com/");
    await expect(page).toHaveTitle(/Google/);
  });
  //2.Navegación a youtube
  test("Navegación a youtube", async ({ page }) => {
    await page.goto("https://www.youtube.com/");
    await expect(page).toHaveTitle(/YouTube/);
  });

  //3.Interactuar con paginas
  test.describe("Navegación y acciones", () => {
    test.beforeAll(async ({ browser }) => {
      console.log("inicializando prueba Navegación y acciones");
    });
    test.beforeEach(async ({ page }) => {
      await page.goto("https://www.google.com/");
    });
    test.afterEach(async () => {
      console.log("Finalizando prueba");
    });
    test.beforeAll(async () => {
      console.log("Finalizando suite)");
    });
    test("agregar 3 todos y contar elementos", async ({ page }) => {
      await page.goto("https://demo.playwright.dev/todomvc/#/");
      await page.fill(".new-todo", "completar leche");
      await page.keyboard.press("Enter");
      await page.fill(".new-todo", "pagar luz");
      await page.keyboard.press("Enter");
      await page.fill(".new-todo", "llamar a mamá");
      await page.keyboard.press("Enter");
      const elements = page.locator(".todo-list li");
      const numElement = await elements.count();
      console.log("Ingresados: ", numElement);
      const todosTexts = await elements.allInnerTexts();
      console.log("Textos ingresados: ", todosTexts);
    });

    test("Navegar a pagina y autenticar", async ({ page }) => {
      await page.goto("https://the-internet.herokuapp.com/login");
      await page.fill("#username", "tomsmith");
      await page.fill("#password", "SuperSecretPassword!");
      await page.click("button[type='submit']");
    });
  });
});

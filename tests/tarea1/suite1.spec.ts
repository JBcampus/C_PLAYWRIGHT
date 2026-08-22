import test, { expect } from "@playwright/test";

test.describe("flujo de login", () => {
  test("Autenticación correcta", async ({ page }) => {
    await page.goto(" https://practice.expandtesting.com/");
    await page.getByRole("button", { name: "Close ad" }).click;

    const card = page.getByRole("link", { name: "Try it out" }).nth(1);
    await expect(card).toBeVisible();

    await page.getByRole("link", { name: "Try it out" }).nth(1).click();
    await page.fill("#username", "practice");
    await page.fill("#password", "SuperSecretPassword!");
    await page.click('button[type="submit"]');
    await expect(page).toHaveURL(/secure/);
    const mensajeExito = page.getByText("You logged into a secure area!");
    await expect(mensajeExito).toBeVisible();
  });

  test("Autenticación incorrecta", async ({ page }) => {
    await page.goto(" https://practice.expandtesting.com/");
    await page.getByRole("link", { name: "Try it out" }).nth(1).click();
    await page.fill("#username", "pract");
    await page.fill("#password", "Super");
    await page.click('button[type="submit"]');
    await expect(page).toHaveURL(/login/);
    const mensajeNoExito = page.getByText("Your password is invalid!");
    await expect(mensajeNoExito).toBeVisible();
  });
});

import { test, expect } from "@playwright/test";
import { CustomDevice, CustomDeviceName } from "../../data/CustomDevices";
test.describe("T7 · Emulación solo custom device y APIRequestContex", () => {
  test("Test — solo disponible para custom device", async ({ page, isMobile, request }) => {
    const projectName = test.info().project.name;
    // Salta inmediatamente si NO es el proyecto requerido
    test.skip(
      projectName !== CustomDeviceName.CustomIphone,
      `Este test sólo corre en "${CustomDeviceName.CustomIphone}". Proyecto actual: "${projectName}".`,
    );

    // Asserts para validar navegador
    const vp = page.viewportSize();
    expect(vp).toBeTruthy();
    expect(vp?.width).toBe(CustomDevice[CustomDeviceName.CustomIphone].viewport.width);
    expect(vp?.height).toBe(CustomDevice[CustomDeviceName.CustomIphone].viewport.height);
    expect(isMobile).toBe(true);

    await test.step("API · GET", async () => {
      const resp = await request.get("https://playground.mockoon.com/companies");
      expect(resp.status()).toBe(200);
      const body = await resp.json();
      expect(Array.isArray(body)).toBeTruthy();
      expect(body.length).toBeGreaterThan(0);

      // Validación de Campos críticos
      expect(body[0]).toHaveProperty("id");
      expect(body[0]).toHaveProperty("name");
    });
    await test.step("API · POST", async () => {
      const objectToInsert = {
        name: "Test e2e",
        industry: "example",
        location: {
          city: "South Valley",
          country: "American Samoa",
        },
        employees: 6,
        is_public: false,
      };
      const resp = await request.post("https://playground.mockoon.com/companies", {
        data: objectToInsert,
      });
      expect(resp.status()).toBe(201);
      const body = await resp.json();
      expect(body).toMatchObject(objectToInsert);
      expect(body).toHaveProperty("id");
    });
    // Acciones UI
    await test.step("UI · Navegar y validar título", async () => {
      await page.goto("https://playwright.dev/");
      await expect(page).toHaveTitle(/Playwright/);
    });
  });
});

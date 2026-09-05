import { test, expect } from "@playwright/test";
import { registerForm } from "../../pages/tarea3/registroForm.page";
import { dataFilePath } from "../../helpers/utils/upload.helper";

test.describe("flujo de llenado de formulario, carga de archivo y generar un flujo de compra", () => {
  test("flujo de contacto con carga de archivo", async ({ page }) => {
    const form = new registerForm(page);

    await form.goto();
    await form.contact();
    await expect(page).toHaveURL(/contact_us/);

    await form.register(
      "Clara",
      "klarys_2@hotmail.com",
      "Asunto de prueba",
      "Este es un mensaje de prueba para el formulario",
      dataFilePath("demo-upload.txt"),
    );
    await form.enviarFormulario();

    await expect(page.locator(".status.alert.alert-success")).toHaveText(
      "Success! Your details have been submitted successfully.",
    );
  });

  test("Flujo de compra", async ({ page }) => {
    const form = new registerForm(page);

    await form.goto();
    await form.poloclick();
    await expect(page).toHaveURL(/Polo/);
    await form.agregar1erItem();

    await expect(page.locator("#cartModal")).toBeVisible();
    await expect(page.getByText("View Cart")).toBeVisible();

   
    

  });
});

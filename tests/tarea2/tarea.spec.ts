import { test, expect } from "@playwright/test";
import path from "path";

test("Test1 - Contact Us form", async ({ page }) => {
  //  Navegar a la página
  await page.goto("https://automationexercise.com/");

  // Verificar que el botón "Contact us" esté visible y hacer click
  const contactUsButton = page.getByRole("link", { name: "Contact us" });
  await expect(contactUsButton).toBeVisible();
  await contactUsButton.click();

  // Verificar que estamos en la página correcta
  await expect(page).toHaveURL(/contact_us/);

  //  Completar formulario con datos ficticios
  await page.getByPlaceholder("Name").fill("Sandra Prueba");
  await page.getByPlaceholder("Email").fill("sandra.prueba@yopmail.com");
  await page.getByPlaceholder("Subject").fill("Asunto de prueba");
  await page
    .getByPlaceholder("Your Message Here")
    .fill("Este es el mensaje de pruebas de tarea 2.");

  // Subir archivo
  const filePath = path.join(__dirname, "data", "demo-upload.txt");
  const fileInput = page.locator('input[name="upload_file"]');

  await fileInput.setInputFiles(filePath);

  // Validar que el archivo se haya cargado
  await expect(fileInput).toHaveValue(/demo-upload.txt/);

  //  Manejar diálogo antes de hacer click en Submit
  page.on("dialog", async (dialog) => {
    await dialog.accept();
  });

  //  Enviar formulario
  await page.getByRole("button", { name: "Submit" }).click();

  //  Validar mensaje de éxito
  const successMessage = page.locator(".status.alert.alert-success");
  await expect(successMessage).toBeVisible();
  await expect(successMessage).toContainText("Success");

  // Presionar botón "Home"
  await page.getByRole("link", { name: "Home" }).click();

  // Validar que regresó al home
  await expect(page).toHaveURL("https://automationexercise.com/");
});

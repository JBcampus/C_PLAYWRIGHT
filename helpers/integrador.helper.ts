import * as fs from "fs";
import * as path from "path";

/**
 * Genera un correo electrónico dinámico único para pruebas de registro.
 * @param prefix Prefijo opcional para identificar el correo.
 * @returns { string } Correo electrónico único generado.
 * @example
 * const email = generateUniqueEmail('test_user');
 */
export function generateUniqueEmail(prefix: string = "user"): string {
  const timestamp = Date.now();
  return `${prefix}_${timestamp}@yopmail.com`;
}

/**
 * Guarda las credenciales de prueba en un archivo JSON compartido para la Suite 2 y 3.
 * @param data Objeto con correo y contraseña.
 * @returns { void }
 * @example
 * saveCredentials({ email: "user_123@yopmail.com", password: "Password123" });
 */
export function saveCredentials(data: { email: string; pass: string }) {
  const filePath = path.join(
    process.cwd(),
    "tests/integrador/user-credentials.json",
  );
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
}

/**
 * Lee las credenciales guardadas para la autenticación.
 * @returns { { email: string; pass: string } } Credenciales almacenadas.
 */
export function getSavedCredentials(): { email: string; pass: string } {
  const filePath = path.join(
    process.cwd(),
    "tests/integrador/user-credentials.json",
  );
  if (fs.existsSync(filePath)) {
    return JSON.parse(fs.readFileSync(filePath, "utf-8"));
  }
  return { email: "default_test@yopmail.com", pass: "Password123" };
}

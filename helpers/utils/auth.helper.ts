import type { Cookie } from "@playwright/test";
import * as fs from "node:fs";
import * as path from "node:path";

/**
 * Devuelve la ruta absoluta para almacenar el archivo de estado de autenticación.
 * Crea el directorio `auth/` si no existe.
 * @param fileName Nombre del archivo donde se guardará el estado (p. ej. "standard_auth.json").
 * @returns {string} Ruta absoluta al archivo de estado.
 * @example
 * const p = saveAuthState('standard_auth.json');
 */
export function saveAuthState(fileName: string): string {
  const stateDir = path.join(process.cwd(), "auth");
  fs.mkdirSync(stateDir, { recursive: true });
  return path.join(stateDir, fileName);
}

/**
 * Imprime en consola el array de cookies (uso: debugging).
 * @param cookies Array de cookies obtenido desde `context.cookies()`.
 * @returns Promise<void>
 * @example
 * await printCookies(await page.context().cookies());
 */
export async function printCookies(cookies: Cookie[]) {
  console.log(`[DEBUG] cantidad de cookies (${cookies.length}) :`);
  cookies.forEach((c) => console.log(c));
}

/**
 * Genera un objeto cookie de ejemplo para pruebas.
 * @returns Promise<object> Cookie-like usable para agregar al contexto.
 * @example
 * const demo = await generateDemoCookie();
 */
export async function generateDemoCookie() {
  return {
    name: `taller6_demo_${Date.now()}`,
    value: "ok",
    domain: "www.saucedemo.com",
    path: "/",
  };
}

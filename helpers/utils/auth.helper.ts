import type { Cookie } from "@playwright/test";
import * as fs from "node:fs";
import * as path from "node:path";
/**
* Función que devuelve la ruta absoluta del archivo de auth. Si existe lo
elimina y genera nuevamente.
*
* - Mantiene los tests organizados y reutilizables.
*
* @param fileName – nombre del archivo donde se guardará el estado deseado.
*/
export function saveAuthState(fileName: string): string {
  const stateDir = path.join(process.cwd(), "auth");
  fs.mkdirSync(stateDir, { recursive: true });
  return path.join(stateDir, fileName);
}
/**
 * Función para imprimir los elementos del array de cookies (Debug only).
 *
 * @param cookies – Array de cookies del browser.
 */
export async function printCookies(cookies: Cookie[]) {
  console.log(`[DEBUG] cantidad de cookies (${cookies.length}) :`);
  cookies.forEach((c) => console.log(c));
}
/**
 * Función para que retorna un objeto cookie aleatoreo.
 */
export async function generateDemoCookie() {
  return {
    name: `taller6_demo_${Date.now()}`,
    value: "ok",
    domain: "www.saucedemo.com",
    path: "/",
  };
}

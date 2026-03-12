import { BrowserContext } from "@playwright/test";
import { log } from "./log.helper";

/**
 * Guarda el estado autenticado en un archivo JSON.
 * @param context Contexto del navegador.
 * @param path Ruta del archivo donde se guardará el estado.
 */
export async function saveState(context: BrowserContext, path: string) {
  log(`Guardando estado en ${path}`);
  await context.storageState({ path });
}

/**
 * Carga un estado previamente guardado.
 * @param path Ruta del archivo JSON.
 */
export function loadState(path: string) {
  log(`Cargando estado desde ${path}`);
  return { storageState: path };
}

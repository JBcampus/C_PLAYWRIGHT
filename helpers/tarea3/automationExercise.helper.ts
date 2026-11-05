import type { Page } from "@playwright/test";
import * as path from "node:path";

/**
 * Obtiene la ruta absoluta de un archivo de prueba guardado en `data`.
 * @param fileName - Nombre del archivo que se va a utilizar.
 * @returns Ruta absoluta del archivo de datos.
 */
export function tarea3DataFilePath(fileName: string): string {
  return path.join(process.cwd(), "data", fileName);
}

/**
 * Cierra el anuncio inicial cuando el sitio muestra un control accesible para hacerlo.
 * @param page - Página de Playwright en la que se busca el anuncio.
 */
export async function dismissInitialAdvertisement(page: Page): Promise<void> {
  const closeButton = page.getByRole("button", {
    name: /^(close|close ad|dismiss|skip ad)$/i,
  });

  if (await closeButton.isVisible()) {
    await closeButton.click();
  }
}

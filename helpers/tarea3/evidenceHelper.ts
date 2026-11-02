import { type Page } from "@playwright/test";
import { mkdir } from "fs/promises";
import path from "path";

/**
 * Guarda una captura de pantalla de la página actual.
 *
 * @param page Página del navegador.
 * @param fileName Nombre del archivo de captura.
 * @returns Promesa que finaliza al guardar la imagen.
 */
export async function saveEvidence(page: Page, fileName: string): Promise<void> {
  const evidenceFolder = path.resolve(process.cwd(), "evidencias/tarea3");

  await mkdir(evidenceFolder, { recursive: true });

  await page.screenshot({
    path: path.join(evidenceFolder, fileName),
    fullPage: true
  });
}
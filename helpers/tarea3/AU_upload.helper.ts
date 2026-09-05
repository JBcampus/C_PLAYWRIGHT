import * as path from "node:path";

/**
 * Construye la ruta absoluta de un archivo almacenado en `data`.
 *
 * @param fileName - Nombre del archivo que se encuentra en `data`.
 * @returns La ruta absoluta del archivo solicitado.
 */
export function dataFilePath(fileName: string): string {
  return path.join(process.cwd(), "data", fileName);
}

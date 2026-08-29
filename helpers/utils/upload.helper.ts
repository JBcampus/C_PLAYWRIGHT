import * as path from "node:path";
/**
 * Helper para centralizar creación de rutas completas de un archivo
que se encuentre en la carpeta data
 *
 * - Mantiene los tests organizados y reutilizables.
 *
 * @param fileName – nombre del archivo.
 */
export function dataFilePath(fileName: string): string {
  return path.join(process.cwd(), "data", fileName);
}

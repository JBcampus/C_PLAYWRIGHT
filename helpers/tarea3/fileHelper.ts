import { access } from "fs/promises";
import path from "path";

/**
 * Obtiene la ruta del archivo demo-upload.txt.
 *
 * @returns Ruta completa del archivo TXT.
 * @throws Error si no se encuentra el archivo.
 */
export async function getTxtFilePath(): Promise<string> {
  const filePath = path.resolve(process.cwd(), "data", "demo-upload.txt");

  try {
    await access(filePath);
  } catch {
    throw new Error(`No se encontró el archivo: ${filePath}`);
  }

  return filePath;
}
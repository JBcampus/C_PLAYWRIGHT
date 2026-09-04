import path from 'path';

/**
 * Helper para obtener la ruta absoluta de un archivo dentro de la carpeta data.
 * @param {string} fileName - Nombre del archivo con su extensión.
 * @returns {string} Ruta absoluta del archivo.
 */
export function getFilePath(fileName) {
  return path.resolve(process.cwd(), 'data', fileName);
}
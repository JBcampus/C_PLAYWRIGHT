/**
 * Helper para trazabilidad de logs.
 * @param message Mensaje a imprimir.
 * @example log('Inicio de login');
 */
export function log(message: string) {
  const timestamp = new Date().toISOString();
  console.log(`[LOG ${timestamp}] ${message}`);
}

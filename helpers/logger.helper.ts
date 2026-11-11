/**
 * Helper para registrar mensajes en la consola con formato estándar.
 */
export class LoggerHelper {
  /**
   * Registra un mensaje informativo.
   * @param message Mensaje a mostrar.
   */
  static info(message: string): void {
    console.log(`[INFO] ${new Date().toISOString()} - ${message}`);
  }
}

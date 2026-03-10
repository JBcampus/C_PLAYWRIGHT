import * as fs from "node:fs";
import * as path from "node:path";

/**
 * Logger simple para trazabilidad en consola y archivo.
 * - Escribe también en `test-results/logs` para conservar trazas.
 */
export class Logger {
  private filePath: string;

  /**
   * Crea un `Logger` y prepara el archivo de log.
   * @param name Prefijo del archivo de log (por defecto "log").
   */
  constructor(name = "log") {
    const dir = path.join(process.cwd(), "test-results", "logs");
    fs.mkdirSync(dir, { recursive: true });
    this.filePath = path.join(dir, `${name}-${Date.now()}.log`);
  }

  private write(line: string) {
    console.log(line);
    try {
      fs.appendFileSync(this.filePath, line + "\n");
    } catch (e) {
      console.warn("No se pudo escribir el log en disco:", e);
    }
  }

  /**
   * Registra un paso significativo del test.
   * @param message Mensaje descriptivo del paso.
   */
  step(message: string) {
    const line = `${new Date().toISOString()} [STEP] ${message}`;
    this.write(line);
  }

  /**
   * Mensaje informativo general.
   * @param message Mensaje a registrar.
   */
  info(message: string) {
    const line = `${new Date().toISOString()} [INFO] ${message}`;
    this.write(line);
  }

  /**
   * Mensaje de error.
   * @param message Mensaje de error.
   */
  error(message: string) {
    const line = `${new Date().toISOString()} [ERROR] ${message}`;
    this.write(line);
  }

  /**
   * Resumen final o texto multi-línea para el log.
   * @param text Texto a registrar en el resumen.
   */
  summary(text: string) {
    const header = `${new Date().toISOString()} [SUMMARY]`;
    this.write(header);
    this.write(text);
  }
}

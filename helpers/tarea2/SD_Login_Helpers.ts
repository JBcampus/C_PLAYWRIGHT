/**
 * Clase de Helpers para el módulo de Login de Sauce Demo
 *
 * Proporciona métodos auxiliares para facilitar la ejecución de pruebas
 * en el módulo de autenticación. Incluye funciones para bloquear
 * solicitudes externas que podrían interferir con los tests.
 *
 * @example
 * ```typescript
 * const helpers = new SD_Login_Helpers(page);
 * await helpers.cerrarTelemetria();
 * ```
 */
import { expect, Page } from "@playwright/test";

export class SD_Login_Helpers {
  /**
   * Constructor de la clase SD_Login_Helpers
   *
   * Inicializa la clase con una instancia de la página de Playwright
   *
   * @param page - La página de Playwright para interactuar con la aplicación
   */
  constructor(private page: Page) {}

  /**
   * Bloquea las solicitudes de telemetría para evitar interferencias en los tests
   *
   * Intercepta todas las solicitudes a events.backtrace.io y las redirige
   * a una respuesta vacía con estado 204 (No Content). Esto previene que
   * las solicitudes de telemetría causen errores durante la ejecución de los tests.
   *
   * @returns Promise que se resuelve cuando la ruta ha sido configurada
   *
   * @example
   * ```typescript
   * await helpers.cerrarTelemetria();
   * // Ahora todas las solicitudes de telemetría serán bloqueadas
   * ```
   */
  async cerrarTelemetria() {
    await this.page.route("https://events.backtrace.io/**", async (route) => {
      await route.fulfill({ status: 204, body: "" });
    });
  }
}

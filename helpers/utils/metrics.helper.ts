export type MetricRecord = {
  label: string;
  durationMs: number;
};

/**
 * Helper simple para medición operativa (timers).
 * - Permite `start`/`stop` por etiqueta y generar un reporte sencillo.
 */
export class Metrics {
  private starts = new Map<string, number>();
  private results: MetricRecord[] = [];

  /**
   * Inicia un temporizador para la etiqueta indicada.
   * @param label Identificador del timer.
   */
  start(label: string) {
    this.starts.set(label, Date.now());
  }

  /**
   * Detiene el temporizador para la etiqueta y retorna la duración en ms.
   * @param label Identificador del timer.
   * @returns number | null Duración en milisegundos, o null si no existía.
   */
  stop(label: string): number | null {
    const s = this.starts.get(label);
    if (s === undefined) return null;
    const dur = Date.now() - s;
    this.results.push({ label, durationMs: dur });
    this.starts.delete(label);
    return dur;
  }

  /**
   * Genera un reporte legible con las métricas registradas.
   * @returns string Reporte multi-línea con duraciones.
   */
  getReport(): string {
    if (this.results.length === 0) return "(no metrics recorded)";
    return this.results.map((r) => `${r.label}: ${r.durationMs} ms`).join("\n");
  }

  /**
   * Limpia los timers y resultados guardados.
   */
  clear() {
    this.starts.clear();
    this.results = [];
  }
}

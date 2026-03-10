/**
 * Mide el tiempo de ejecución de un bloque de código.
 * @param label Nombre de la métrica.
 * @param fn Función a medir.
 * @returns Resultado de la función ejecutada.
 */
export async function measure<T>(label: string, fn: () => Promise<T>) {
  const start = performance.now();
  const result = await fn();
  const end = performance.now();
  console.log(`[METRIC] ${label}: ${(end - start).toFixed(2)} ms`);
  return result;
}
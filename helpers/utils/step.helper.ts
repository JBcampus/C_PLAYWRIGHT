import { Page, test } from "@playwright/test";

/**
 * Igual que test.step, pero al terminar el paso (incluso si falla)
 * toma un screenshot y lo adjunta al resultado para que aparezca en el PDF.
 * El nombre del adjunto lleva el estado: "<passed|failed>|<título del paso>".
 */
export async function step<T>(
  page: Page,
  title: string,
  body: () => Promise<T>,
): Promise<T> {
  let status = "passed";
  try {
    return await test.step(title, body);
  } catch (error) {
    status = "failed";
    throw error;
  } finally {
    try {
      const image = await page.screenshot({ timeout: 5000 });
      await test.info().attach(`${status}|${title}`, {
        body: image,
        contentType: "image/png",
      });
    } catch {
      // La página puede estar cerrada (timeout del test); no ocultar el error original.
    }
  }
}

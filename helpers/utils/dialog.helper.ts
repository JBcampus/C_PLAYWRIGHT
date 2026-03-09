import type { Dialog } from "@playwright/test";

export type DialogOptions = {
  promptText?: string;
  confirmAction?: "accept" | "dismiss";
  log?: boolean;
};

/**
 * Helper para estandarizar comportamientos de dialogos js
 *
 * - Encapsula el page.on("dialog") y estandariza el comportamiento
 * - Mantiene los tests organizados y reutilizables.
 *
 * @param opts - parametros para el comportamiento de los dialogos.
 */
export async function jsDialogHandler(dialog: Dialog, opts: DialogOptions = {}) {
  const { promptText = "Hola desde Playwright", confirmAction = "dismiss", log = true } = opts;

  if (log) {
    console.log(`[DEBUG] (Dialog) type=${dialog.type()} message="${dialog.message()}"`);
  }

  if (dialog.type() === "prompt") {
    await dialog.accept(promptText);
    return;
  }

  if (dialog.type() === "confirm") {
    if (confirmAction === "dismiss") await dialog.dismiss();
    else await dialog.accept();
    return;
  }

  // alert
  await dialog.accept();
}

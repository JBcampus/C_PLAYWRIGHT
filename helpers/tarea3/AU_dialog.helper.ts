import type { Dialog } from "@playwright/test";

/** Opciones para controlar la respuesta ante un dialogo JavaScript. */
export type DialogOptions = {
  /** Texto que se envia cuando el dialogo es de tipo `prompt`. */
  promptText?: string;
  /** Accion que se ejecuta cuando el dialogo es de tipo `confirm`. */
  confirmAction?: "accept" | "dismiss";
  /** Indica si se registra informacion del dialogo en la consola. */
  log?: boolean;
};

/**
 * Responde de forma estandarizada a un dialogo JavaScript de Playwright.
 *
 * Los dialogos `prompt` se aceptan con el texto configurado, los `confirm`
 * se aceptan o descartan segun la configuracion y los `alert` se aceptan.
 *
 * @param dialog - Dialogo emitido por la pagina de Playwright.
 * @param opts - Opciones para definir el comportamiento del dialogo.
 * @returns Una promesa que se resuelve cuando el dialogo ha sido atendido.
 */
export async function jsDialogHandler(
  dialog: Dialog,
  opts: DialogOptions = {},
) {
  const {
    promptText = "Hola desde Playwright",
    confirmAction = "dismiss",
    log = true,
  } = opts; //desestructuración de objetos en javascripts: inicializa los valores en caso lleguen vacios y permite usarlos despues.

  if (log) {
    console.log(
      `[DEBUG] (Dialog) type=${dialog.type()} message="${dialog.message()}"`,
    );
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

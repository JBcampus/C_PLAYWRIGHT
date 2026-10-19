import type { Registro } from "./registerTypes";
import { registerValidate } from "./registerValidate";

/**
* Ejecuta el flujo principal de registro de un usuario.
*
* @returns No devuelve ningún valor; muestra el resultado en consola.
* @example
* main();
*/

function main(): void {
  const registro: Registro = {
    username: "carlos",
    password: "123456",
    confirmPassword: "123456",
    role: "admin"
  };

  console.log("Iniciando registro...\n");

  const resultado = registerValidate(registro);

  if (!resultado.ok) {
    console.error("Error en el registro:", resultado.message);
    return;
  }

  console.log("Registro exitoso.");
  console.log("Usuario creado:", resultado.data);
}

main();

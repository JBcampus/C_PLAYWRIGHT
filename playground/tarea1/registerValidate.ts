import { randomUUID } from "crypto";
import type { RegisterUser, Result, User, Role2 } from "./registerTypes";
/**
* Simula un registro de usuario. Retorna un usuario si la contraseña cumple con longitud minima y confirmacion de contraseña.
*
* ### Details
*
* @param regusr- Registro de usuario. {@link RegisterUser}.
* @returns-{@link Result}<{@link User}>.
*
* @example
* ```ts
* const r = await register({ username:"carlos", password:"123456",
confirmPassword:"123456", role: "admin" });
* ```
*
*
* @see {@link RegisterUser} {@link User} {@link Role2} {@link Result}
*/
export const registerUsr = async (
  regusr: RegisterUser,
): Promise<Result<User>> => {
  const { username, password, confirmPassword, role2 } = regusr;

  // Validacion de longitud minima 6 de contraseña.
  if (password.trim().length < 6) {
    return {
      ok: false,
      message: "La contraseña debe tener una longitud minima de 6 caracteres",
    };
  }

  // Validacion de contraseña y su confirmacion.
  if (password !== confirmPassword) {
    return {
      ok: false,
      message:
        "La contraseña debe ser igual a la confirmacion de la contraseña",
    };
  }

  // Funcion para generar email en base a role + username.
  function generarEmail(
    role: string,
    username: string,
    dominio: string = "email.com",
  ): string {
    // 1. Limpiar texto: quitar acentos y caracteres especiales
    const limpiarTexto = (texto: string): string => {
      return texto
        .normalize("NFD") // Separa los acentos de las letras
        .replace(/[\u0300-\u036f]/g, "") // Elimina los acentos
        .toLowerCase()
        .trim();
    };
    const rolLimpio = limpiarTexto(role).replace(/\s+/g, "-"); // Une roles con guiones
    const nombreLimpio = limpiarTexto(username).replace(/\s+/g, "."); // Une nombres con puntos

    // 2. Construir la estructura: rol.nombre@email.com
    return `${rolLimpio}.${nombreLimpio}@${dominio}`;
  }

  //simulación validación pesada
  await new Promise<void>((r) => setTimeout(r, 5000));

  const email = generarEmail(role2, username);

  const user: User = {
    id: randomUUID(),
    username,
    role2,
    password,
    email,
  };
  return { ok: true, data: user };
};

/** Formatea un usuario para mostrar en log. */
export const formatUser = (u: User): string => `[${u.username}]
${u.role2} (${u.email})`;

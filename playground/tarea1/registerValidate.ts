import { randomUUID } from "node:crypto";
import type { Register, Result, Role, User } from "./registerTypes";

/**
 * Registra un usuario si la contraseña cumple las reglas.
 *
 * @param data Datos para el registro del usuario.
 * @returns El usuario creado o un mensaje de error.
 * @example
 * const result = await register({
 *   username: "carlos",
 *   password: "123456",
 *   confirmPassword: "123456",
 *   role: "admin",
 * });
 */

const validRoles: readonly Role[] = ["admin", "editor", "viewer"];

export const register = async (data: Register): Promise<Result<User>> => {
  if (!validRoles.includes(data.role)) {
    return {
      ok: false,
      message: "El rol no es válido",
    };
  }

  if (data.username.trim() === "") {
    return {
      ok: false,
      message: "El usuario no puede estar vacío",
    };
  }

  if (data.password.trim() === "") {
    return {
      ok: false,
      message: "La contraseña no puede estar vacía",
    };
  }

  if (data.password.length < 6) {
    return {
      ok: false,
      message: "La contraseña debe tener al menos 6 caracteres",
    };
  }

  if (data.password !== data.confirmPassword) {
    return {
      ok: false,
      message: "La contraseña y su confirmación no coinciden",
    };
  }

  const user: User = {
    id: randomUUID(),
    username: data.username,
    role: data.role,
    password: data.password,
    email: `${data.role}.${data.username}@email.com`,
  };

  return { ok: true, data: user };
};

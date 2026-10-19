import { randomUUID } from "crypto";
import type { Registro, User, Result } from "./registerTypes";

/**
 * Valida que la contraseña tenga al menos 6 caracteres.
 *
 * @param password Contraseña que se desea validar.
 * @returns Un resultado indicando si la contraseña es válida.
 * @example
 * validatePasswordLength("123456"); // { ok: true }
 * validatePasswordLength("123"); // { ok: false }
 */

export function validatePasswordLength(password: string): Result<boolean> {
  if (password.length < 6) {
    return {
      ok: false,
      message: "La contraseña debe tener al menos 6 caracteres."
    };
  }

  return {
    ok: true,
    data: true
  };
}

/**
 * Valida que la contraseña coincida con su confirmación.
 *
 * @param password Contraseña ingresada.
 * @param confirmPassword Confirmación de la contraseña.
 * @returns Un resultado indicando si ambas contraseñas coinciden.
 * @example
 * validatePasswordMatch("123456", "123456"); // { ok: true, data: true }
 */

export function validatePasswordMatch(password: string, confirmPassword: string): Result<boolean> {
  if (password !== confirmPassword) {
    return {
      ok: false,
      message: "La contraseña y su confirmación no coinciden."
    };
  }

  return {
    ok: true,
    data: true
  };
}

/**
 * Genera un correo electrónico utilizando el rol y el nombre de usuario.
 *
 * @param role Rol del usuario.
 * @param username Nombre del usuario.
 * @returns Un correo electrónico generado a partir del rol y el nombre.
 * @example
 * generateEmail("admin", "carlos"); // "[admin.carlos@email.com]"
 */

export function generateEmail(role: Registro["role"], username: string): string {
  return `${role}.${username}@email.com`;
}

/**
 * Valida los datos del registro y genera un usuario si son correctos.
 *
 * @param data Datos de registro: username, password, confirmPassword y role.
 * @returns Un resultado exitoso con el usuario creado o un mensaje de error.
 * @example
 * const result = registerValidate({
 * username: "carlos",
 * password: "123456",
 * confirmPassword: "123456",
 * role: "admin"
 * });
 */

export function registerValidate(data: Registro): Result<User> {
  const username = data.username.trim();

  if (!username) {
    return {
      ok: false,
      message: "El nombre de usuario es obligatorio."
    };
  }

  const passwordLengthResult = validatePasswordLength(data.password);

  if (!passwordLengthResult.ok) {
    return {
      ok: false,
      message: passwordLengthResult.message
    };
  }

  const passwordMatchResult = validatePasswordMatch(
    data.password,
    data.confirmPassword
  );

  if (!passwordMatchResult.ok) {
    return {
      ok: false,
      message: passwordMatchResult.message
    };
  }

  const user: User = {
    id: randomUUID(),
    username,
    role: data.role,
    password: data.password,
    email: generateEmail(data.role, username)
  };

  return {
    ok: true,
    data: user,
    message: "Usuario registrado correctamente."
  };
}

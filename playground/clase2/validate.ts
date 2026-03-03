import { randomUUID } from "crypto";
import type { Credentials, Result, User, Role } from "./typex";

/**
 * Simula el proceso de autenticación de un usuario.
 * Valida las credenciales y retorna los datos del usuario si son correctas.
 * @param creds - Credenciales de login { username, password }.
 * @returns {Promise<Result<User>>} { ok: true, data: User } | { ok: false, message: string }
 * @example
 * // Login exitoso
 * const res = await login({ username: "adm.jesus", password: "permitido" });
 * if (res.ok && res.data) {
 *   console.log("Login exitoso", res.data.role); // admin
 * }
 * 
 * @example
 * const res = await login({ username: "viewer.jesus", password: "xyz" });
 * console.log(res.ok); // false
 * console.log(res.message); // "Credenciales invalidas"
 
export function login(creds: Credentials): Promise<Result> {
  // Implementación aquí
}
* @see {@link Credentials} {@link Result} {@link User} {@link Role }
*/
export const login = async (creds: Credentials): Promise<Result<User>> => {
  const { username, password } = creds;

  // validaciones.
  if (password !== "permitido") {
    return { ok: false, message: "Credenciales inválidas" };
  }
  // simulación validación pesadaawaitnewPromise<void>(r=>setTimeout(r, 5000));

  const role: Role = username.startsWith("adm")
    ? "admin"
    : username.startsWith("ed")
      ? "editor"
      : "viewer";

  const user: User = {
    id: randomUUID(),
    username,
    role,
  };
  return { ok: true, data: user };
};
/**
 * Formatea un objeto usuario para mostrar en logs y consola.
 * Retorna una cadena legible con el rol, nombre de usuario e ID.
 * @param u - Objeto usuario a formatear.
 * @returns {string} Cadena formateada con el formato [rol] username (id).
 * @example
 * // Usuario admin
 * const user = { id: "123", username: "adm.jesus", role: "admin" };
 * console.log(formatUser(user)); // "[admin] adm.jesus (123)"
 * @example
 * // Usuario viewer
 * const user = { id: "456", username: "viewer.andres", role: "viewer" };
 * console.log(formatUser(user)); // "[viewer] viewer.andres (456)"
 */
export const formatUser = (u: User): string => `[${u.role}] ${u.username} (${u.id})`;

import { randomUUID } from "crypto";
import { Credentials, Result, Role, User } from "./types";

/**
 * Simula un login. Retorna un usuario si la contraseña coincide.
 *
 * ### Details
 *
 * @param creds - Credenciales de acceso. {@link Credentials}.
 * @returns - {@link Result}<{@link User}>.
 *
 * @example
 * ```ts
 * const res = await login({ username: 'adm.carla', password: 'permitido' });
 * if (res.ok && res.data) {
 *   console.log(res.data.role); // "admin"
 * }
 * ```
 *
 * @example
 * ```ts
 * const res = await login({ username: 'viewer.pepe', password: 'x' });
 * console.log(res) // { ok: false, message: 'Credenciales inválidas' }
 * ```
 *
 * @see {@link Credentials} {@link User} {@link Role} {@link Result}
 */
export const login = async (creds: Credentials): Promise<Result<User>> => {
  const { username, password } = creds;

  // Validaciones.
  if (password !== 'permitido') {
    return { ok: false, message: 'Credenciales inválidas' };
  }

  //simulación validación pesada
  await new Promise<void>(r => setTimeout(r, 5000));

  const role: Role =
    username.startsWith('adm') ? 'admin' : username.startsWith('ed') ? 'editor' : 'viewer';

  const user: User = {
    id: randomUUID(),
    username,
    role
  };

  return { ok: true, data: user };
};

/** Formatea un usuario para mostrar en log. */
export const formatUser = (u: User): string => `[${u.role}] ${u.username} (${u.id})`;

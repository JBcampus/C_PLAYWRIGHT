import { randomUUID } from "crypto";
import type { Credentials, Register, Result, Role, User } from "./types";
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
* const res = await login({ username: 'adm.carla', password:
'permitido' });
* if (res.ok && res.data) {
* console.log(res.data.role); // "admin"
* }
* ```
*
* @example
* ```ts
* const res = await login({ username: 'viewer.pepe', password: 'x'
});
* console.log(res) // { ok: false, message: 'Credenciales
inválidas' }
* ```
*
* @see {@link Credentials} {@link User} {@link Role} {@link Result} {@link Register}
*/
export const login = async (regis: Register): Promise<Result<User>> => {
  const { username, password, confirmPassword } = regis;
  // Validaciones.
    // longitud minima
    if (password.length < 6){
      return { ok: false, message: "Longitud Minisma es 6" };
    }

    // validación de contraseña y confirmación de contraseña
    if (password !== confirmPassword) {
      return { ok: false, message: "Password No coincide" };
    }

  //simulación validación pesada
  await new Promise<void>((r) => setTimeout(r, 5000));

  const role: Role = username.startsWith("ad")
    ? "admin"
    : username.startsWith("ed")
      ? "editor"
      : "viewer";

  const user: User = {
    id: randomUUID(),
    username,
    role,
    password,
    email: `${role}.${username}@email.com`,
  };

  return { ok: true, data: user };
};

/** Formatea un usuario para mostrar en log. */
export const formatUser = (u: User): string => `[${u.role}] ${u.username} ${u.password} ${u.email} (${u.id})`;

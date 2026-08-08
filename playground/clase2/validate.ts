import { randomUUID } from "crypto";
import type { Credentials, Result, User, Role } from "./types";

/**
* Simula un login. Retorna un usuario si la contraseña coincide.
*
* ### Details
*
* @param creds- Credenciales de acceso. {@link Credentials}.
* @returns-{@link Result}<{@link User}>.
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
* const res = await login({ username: 'viewer.pepe', password:
'x' });
* console.log(res) // { ok: false, message: 'Credenciales
inválidas' }
* ```
*
* @see {@link Credentials} {@link User} {@link Role} {@link Result}
*/
export const login = async (creds: Credentials): Promise<Result<User>> => {
  //retorna datos funcion asincrona puede demorar
  const { username, password } = creds; //extraccion de usuario y contraseña si es diferente y no cumple falso sino ok
  // Validaciones.
  if (password !== "permitido") {
    return { ok: false, message: "Credenciales inválidas" };
  }
  //simulación validación pesada
  await new Promise<void>((r) => setTimeout(r, 5000)); //repsuesta de 5 segundos
  const role: Role = username.startsWith("adm")
    ? "admin" //ed : editor, validad con :?
    : username.startsWith("ed")
      ? "editor" //retorna valor
      : "viewer"; // retorna valor
  const user: User = {
    id: randomUUID(),
    username, //valor incial
    role, //valor inicial
  };
  return { ok: true, data: user }; //respuesta de promise uso como ejemplo: fetch
};

/** Formatea un usuario para mostrar en log. */
export const formatUser = (u: User): string => `[${u.role}]
${u.username} (${u.id})`;

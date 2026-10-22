import { randomUUID } from "crypto";
import type { Roles, Register, User, Result} from "./registerTypes";
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


export const login = async (reg: Register): Promise<Result<User>> => {
  const { username, password, confirmPassword } = reg;
  // Validaciones.
  if (password.length <= 6) {
    return { ok: false, message: "Longitud menor o igual a 6" };
  }

  if (password !== confirmPassword) {
    return { ok: false, message: "Las contraseñas no coinciden" };
  }

  //simulación validación pesada
  await new Promise<void>((r) => setTimeout(r, 5000));
  
  const role: Roles = username.startsWith("adm")
    ? "admin"
    : username.startsWith("ed")
      ? "editor"
      : "viewer";
  
  const email: string = role + "." + username + "@email.com";
      
  const user: User = {
    id: randomUUID(),
    username,
    role,
    password,
    email
  };

  return { ok: true, data: user };
};

/** Formatea un usuario para mostrar en log. */
export const formatUser = (u: User): string => `[${u.role}]
${u.username} ${u.email} (${u.id})`;

import { randomUUID } from 'crypto';
import type { Credentials, Result, User, Role } from './registerTypes';
import { ok } from 'assert/strict';
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
* const res = await login({ username: 'viewer.pepe', password:
'x' });
* console.log(res) // { ok: false, message: 'Credenciales
inválidas' }
* ```
*
* @see {@link Credentials} {@link User} {@link Role} {@link Result}
*/
export const login = async (creds: Credentials): Promise<Result<User>> => {
const { username, password, confirmPassword } = creds;
// Validaciones.
function validatePasswordRegex(password: string): boolean {
  const regex = /^.{1,6}$/;
  console.log('Regex for password validation:', regex);
  console.log('Validating password:', password);
  return regex.test(password);
}
if(password != confirmPassword) {
  return { ok: false, message: 'Las contraseñas no coinciden' };
}
//simulación validación pesada
await new Promise<void>(r => setTimeout(r, 5000));
const role: Role = username.startsWith('adm') 
? 'admin' :
username.startsWith('ed') 
? 'editor' 
: 'viewer';
const user: User = {
id: randomUUID(),
username,
role, 
email: emailFor(username)
};
return { ok: true, data: user };
};
/** Construye el email de un usuario a partir de su username. */
export const emailFor = (username: string): string => `${username}@example.com`;

/** Formatea un usuario para mostrar en log. */
export const formatUser = (u: User): string => `[${u.role}] ${u.username} (${u.email})`;
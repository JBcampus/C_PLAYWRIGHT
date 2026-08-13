/** Rol permitido para el app */
export type Role = "admin" | "editor" | "viewer";
/** Interface de usuario para autenticación */
export interface User {
  id: string;
  username: string;
  role: Role;
}
/** Interfaz de credenciales para autenticación de login */
export interface Credentials {
  username: string;
  password: string;
}
/** Interface para el resultado de la operación*/
export interface Result<T> {
  ok: boolean;
  data?: T;
  message?: string;
}

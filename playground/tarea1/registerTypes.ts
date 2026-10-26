/** Rol permitido en la app */
export type Role2 = "admin" | "editor" | "viewer";

/** Interfaz de usuario para registrarlo */
export interface User {
  id: string;
  username: string;
  role2: Role2;
  password: string;
  email: string;
}

/** Interfaz de registro de usuario */
export interface RegisterUser {
  username: string;
  password: string;
  confirmPassword: string;
  role2: Role2;
}

/** Interface de resultado de una operación */
export interface Result<T> {
  ok: boolean;
  data?: T;
  message?: string;
}
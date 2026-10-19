/** Rol permitido en la app */
export type Role = "admin" | "editor" | "viewer";

/** Interfaz de usuario para autenticación */
export interface Registro {
  username: string;
  password: string;
  confirmPassword: string;
  role: Role;
}

/** Interfaz de credenciales para login */
export interface User {
  id: string;
  username: string;
  role: Role;
  password: string;
  email: string;
}

/** Interface de resultado de una operación */
export interface Result<T> {
  ok: boolean;
  data?: T;
  message?: string;
}
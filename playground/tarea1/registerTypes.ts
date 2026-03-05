/** Rol permitido en la app */
export type Role = "admin" | "editor" | "viewer";

/** Interfaz de usuario para Register */
export interface Register {
  username: string;
  passworf: string;
  confirmPassword: string;
  role: Role;
}

/** Interfaz de credenciales para User */
export interface User {
  id: string;
  username: string;
  role: string;
  password: string;
  email: string;
}

/** Interface de resultado de una operación */
export interface Result<T> {
  ok: boolean;
  data?: T;
  message?: string;
}

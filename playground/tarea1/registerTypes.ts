/** Tipos de roles permitidos */
export type Role = "admin" | "editor" | "viewer";

/**
 * Interfaz de Registro con usuario, password, confirmacionPassword y rol
 */
export interface Register {
  username: string;
  password: string;
  confirmPassword: string;
  role: Role;
}

/**
 * Interfaz de Usuario
 */
export interface User {
  id: string;
  username: string;
  role: Role;
  password: string;
  email: string;
}

/** Interfaz de credenciales para login */
export interface Credentials {
  username: string;
  password: string;
}

/** Interface de resultado de una operación */
export interface Result<T> {
  ok: boolean;
  data?: T;
  message?: string;
}

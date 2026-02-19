/** Rol permitido en la app */
export type Role = 'admin' | 'editor' | 'viewer';

/** Interfaz de usuario para autenticación */
export interface User {
  id: string;
  username: string;
  role: Role;
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

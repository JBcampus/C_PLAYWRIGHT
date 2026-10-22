/** Rol permitido en la app */
export type Roles = "admin" | "editor" | "viewer";

/** Interfaz de registro para la autenticación */
export interface Register {  
  username: string;
  password: string;
  confirmPassword: string
  role: Roles;
}

/** Interfaz de usuario para la autenticación */
export interface User {
  id: string;
  username: string;
  role: Roles;
  password: string;
  email: string
}

/** Interface de resultado de una operación */
export interface Result<T> {
  ok: boolean;
  data?: T;
  message?: string;
}

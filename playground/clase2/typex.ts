/**Rol permitido en la app */
export type Role = "admin" | "editor" | "viewer";

/**interfaz de usuario de autenticacion*/

export interface User {
  id: string;
  username: string;
  role: Role; // Usamos el tipo Role aquí
}
// interface de credenciales para login

export interface Credentials {
  username: string;
  password: string;
}

// interface de resultado de una operacion de autenticacion
export interface Result<T> {
  ok: boolean;
  data?: T; // Datos devueltos en caso de éxito
  message?: string; // Mensaje de error en caso de fallo
}

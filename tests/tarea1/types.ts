/** Interfaz de credenciales para el login web */
export interface Credentials {
  username: string;
  password: string;
}

/** Interfaz genérica de resultado de una operación */
export interface Result<T> {
  ok: boolean;
  data?: T;
  message?: string;
}

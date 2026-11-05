/** Roles permitidos para los usuarios registrados. */
export type Role = "admin" | "editor" | "viewer";

/** Datos necesarios para registrar una cuenta. */
export interface Register {
  username: string;
  password: string;
  confirmPassword: string;
  role: Role;
}

/** Usuario creado después de un registro exitoso. */
export interface User {
  id: string;
  username: string;
  role: Role;
  password: string;
  email: string;
}

/** Resultado de una operación que puede tener éxito o fallar. */
export interface Result<T> {
  ok: boolean;
  data?: T;
  message?: string;
}
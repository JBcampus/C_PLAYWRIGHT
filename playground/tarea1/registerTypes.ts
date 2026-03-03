
/* definimos los tipos de roles para el registro */
export type Role = "admin" | "editor" | "viewer";

/**
 * Interface para datos de registro de usuario
 * @property {string} username - Nombre de usuario único para la cuenta
 * @property {string} password - Contraseña de la cuenta (mínimo recomendado 8 caracteres)
 * @property {string} email - Correo electrónico del usuario para contacto y recuperación de cuenta   
 * @property {string} ConfirmPassword - Confirmación de la contraseña para validación
 * @property {Role} role - Rol asignado al usuario (admin, editor o viewer)
 * @property {string} id - Identificador único del usuario (generado automáticamente al registrar)
 */
export interface RegisterData {
  username: string;
  password: string;
  confirmPassword: string;
  role: Role;
}
/* Interface de usuario */
export interface UserData {
   id: string; 
  username: string;
  role: Role;
  password: string;
  email: string;
}
/* Interface de resultados (result) --> res */
export interface Result<T> {
  ok: boolean; // Indica condición de éxito o error
  data?: T; // Datos devueltos en caso de éxito 
  message?: string; // Mensaje de error en caso de fallo (opcional)
}
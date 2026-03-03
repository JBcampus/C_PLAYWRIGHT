import { randomUUID } from 'crypto';
import { RegisterData, UserData, Result } from './registerTypes';
/**
 * Valida la longitud mínima de una contraseña.
 * Asegura que la contraseña cumpla con el requisito de caracteres mínimos.
 * @param password - Cadena de contraseña a validar.
 * @param minLength - Número mínimo de caracteres requeridos (por defecto: 6).
 * @returns {boolean} Verdadero si la contraseña cumple el requisito, falso en caso contrario.
 * @example
 * // Contraseña válida
 * validatePasswordLength("pass123", 6) // retorna true
 * @example
 * // Contraseña inválida (demasiado corta)
 * validatePasswordLength("abc", 6) // retorna false
 */
export const validatePasswordLength = (password: string, minLength: number = 6): boolean => {
  return password.length >= minLength;
};
/**
 * Valida que la contraseña y su confirmación coincidan.
 * Asegura que ambas entradas de contraseña sean idénticas antes del registro.
 * @param password - La contraseña original.
 * @param confirmPassword - La contraseña de confirmación a comparar.
 * @returns {boolean} Verdadero si las contraseñas coinciden exactamente, falso en caso contrario.
 * @example
 * // Las contraseñas coinciden
 * validatePasswordMatch("pass123", "pass123") // retorna true
 * @example
 * // Las contraseñas no coinciden
 * validatePasswordMatch("pass123", "pass456") // retorna false
 */
export const validatePasswordMatch = (password: string, confirmPassword: string): boolean => {
  return password === confirmPassword;
};

/**
 * Genera una dirección de correo electrónico basada en el rol y nombre de usuario.
 * El formato del correo sigue el patrón: {rol}.{nombre}@email.com
 * @param role - El rol del usuario (admin, editor, viewer).
 * @param username - El nombre de usuario para generar el correo.
 * @returns {string} Dirección de correo electrónico generada.
 * @example
 * // Correo de usuario admin
 * generateEmail("admin", "jesus") // retorna "admin.jesus@email.com"
 * @example
 * // Correo de usuario editor
 * generateEmail("editor", "Christian") // retorna "editor.christian@email.com"
 */
export const generateEmail = (role: string, username: string): string => {
  return `${role}.${username}@email.com`;
};

/**
 * Función principal de validación de registro.
 * Valida todos los requisitos de registro incluyendo fortaleza de contraseña,
 * coincidencia de contraseña, y genera los datos del usuario con correo electrónico.
 * @param data - Datos de registro { username, password, confirmPassword, role }.
 * @returns {Result<UserData>} { ok: true, data: User } | { ok: false, message: string }
 * @example
 * // Registro exitoso
 * const result = await RegisterDataValidate({
 *   username: "jesus",
 *   password: "JesusAdmin2026!",
 *   confirmPassword: "JesusAdmin2026!",
 *   role: "admin"
 * });
 * if (result.ok) console.log(result.data); // Objeto de usuario creado
 * @example
 * // Validación fallida - contraseñas no coinciden
 * const result = await RegisterDataValidate({
 *   username: "Christian",
 *   password: "pass123",
 *   confirmPassword: "pass456",
 *   role: "editor"
 * });
 * if (!result.ok) console.log(result.message); // "Las contraseñas no coinciden"
 */
export const RegisterDataValidate = (data: RegisterData): Result<UserData> => {
  const { username, password, confirmPassword, role } = data;

  // Validar longitud de contraseña
  if (!validatePasswordLength(password)) {
    return {
      ok: false,
      message: 'La contraseña debe tener al menos 6 caracteres'
    };
  }

  // Validar que las contraseñas coincidan
  if (!validatePasswordMatch(password, confirmPassword)) {
    return {
      ok: false,
      message: 'Las contraseñas no coinciden'
    };
  }

  // Crear objeto de usuario con datos de registro
  const newUserData: UserData = {
    id: randomUUID(),
    username,
    password,
    role,
    email: generateEmail(role, username)
  };

  return {
    ok: true,
    data: newUserData,
    message: 'Registro exitoso'
  };
};
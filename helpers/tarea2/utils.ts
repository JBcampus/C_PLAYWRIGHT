/**
 * Módulo de funciones utilitarias reutilizables para el flujo de pruebas.
 * @module HelperUtils
 */

/**
 * Obtiene las credenciales de usuario predeterminadas para SauceDemo.
 * 
 * @returns Objeto con usuario y contraseña válidos.
 */
export function getValidCredentials() {
  return {
    username: 'standard_user',
    password: 'secret_sauce',
  };
}

/**
 * Obtiene las credenciales de un usuario bloqueado para SauceDemo.
 * 
 * @returns Objeto con usuario bloqueado y contraseña.
 */
export function getLockedOutCredentials() {
  return {
    username: 'locked_out_user',
    password: 'secret_sauce',
  };
}




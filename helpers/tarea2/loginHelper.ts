/**
 * Credenciales utilizadas por los flujos de autenticación de la Tarea 02.
 */
export interface LoginCredentials {
  username: string;
  password: string;
}

/**
 * Funciones reutilizables para los flujos de autenticación de la Tarea 02.
 */
export class LoginHelper {
  /**
   * URL base de la aplicación bajo prueba.
   */
  static readonly baseUrl = LoginHelper.getEnvVariable(
    'SAUCEDEMO_BASE_URL',
    'https://www.saucedemo.com/',
  );

  /**
   * Credenciales válidas para los escenarios de login.
   */
  static readonly validCredentials: LoginCredentials = {
    username: LoginHelper.getEnvVariable('SAUCEDEMO_USERNAME', 'standard_user'),
    password: LoginHelper.getEnvVariable('SAUCEDEMO_PASSWORD', 'secret_sauce'),
  };

  /**
   * Credenciales del usuario bloqueado.
   */
  static readonly lockedOutCredentials: LoginCredentials = {
    username: LoginHelper.getEnvVariable(
      'SAUCEDEMO_LOCKED_USERNAME',
      'locked_out_user',
    ),
    password: LoginHelper.getEnvVariable(
      'SAUCEDEMO_LOCKED_PASSWORD',
      'secret_sauce',
    ),
  };

  /**
   * Mensaje esperado al intentar acceder con un usuario bloqueado.
   */
  static readonly lockedOutErrorMessage =
    'Epic sadface: Sorry, this user has been locked out.';

  /**
   * Obtiene de forma segura una variable de entorno o un valor por defecto.
   * @param key - Clave de la variable de entorno.
   * @param defaultValue - Valor de respaldo opcional.
   * @returns El valor correspondiente de la variable.
   */
  static getEnvVariable(key: string, defaultValue: string = ''): string {
    return process.env[key] || defaultValue;
  }
}

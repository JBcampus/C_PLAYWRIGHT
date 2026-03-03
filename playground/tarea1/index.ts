import type { RegisterData, Result, UserData } from "./registerTypes";
import { RegisterDataValidate } from "./registerValidate";
/**
 * Orquestación principal
 * @fileoverview Sistema de validación de registro de usuarios con casos de prueba y resultados formateados.
 * @author Grupo 1 - Curso Playwright + TypeScript E2E *
 * @participants
 * - JESUS ANDRES MARTINEZ NIÑO DE GUZMAN
 * - CHRISTIAN EDWIN MUJICA MOLINA
 * - IBETH LILIANA FRETEL CELIS
 *
 * @description
 * Módulo que ejecuta pruebas de validación del sistema de registro de usuarios.
 * Prueba casos exitosos y de error para asegurar comportamiento correcto.
 */

// ============================================================================
// TIPOS
// ============================================================================

/**
 * Resultado de una prueba individual.
 */
interface TestResult {
  name: string;
  passed: boolean;
  data?: UserData;
  error?: string;
  duration: number;
}

// ============================================================================
// FUNCIONES DE FORMATO
// ============================================================================

/**
 * Formatea un resultado exitoso para mostrar en consola.
 * @param result - Resultado de la validación.
 * @returns {string} Cadena formateada con los datos del usuario.
 */
const formatSuccessResult = (result: Result<UserData>): string => {
  if (!result.ok || !result.data) return "";
  const { data } = result;
  return (
    `✓ ${result.message}\n` +
    `  ├─ Usuario: ${data.username}\n` +
    `  ├─ Rol: ${data.role}\n` +
    `  ├─ Email: ${data.email}\n` +
    `  └─ ID: ${data.id}`
  );
};

/**
 * Formatea un resultado fallido para mostrar en consola.
 * @param result - Resultado fallido de la validación.
 * @returns {string} Cadena con el mensaje de error.
 */
const formatErrorResult = (result: Result<UserData>): string => {
  if (result.ok) return "";
  return `✗ ${result.message}`;
};

// ============================================================================
// EJECUTOR DE PRUEBAS
// ============================================================================

/**
 * Ejecuta una prueba de registro con los datos proporcionados.
 * @param testData - Datos de registro a probar.
 * @param testName - Nombre descriptivo de la prueba.
 * @returns {TestResult} Resultado de la prueba.
 */
const executeTest = (testData: RegisterData, testName: string): TestResult => {
  const startTime = performance.now();
  const result = RegisterDataValidate(testData);
  const duration = performance.now() - startTime;

  return {
    name: testName,
    passed: result.ok,
    data: result.ok ? result.data : undefined,
    error: !result.ok ? result.message : undefined,
    duration,
  };
};

// ============================================================================
// FUNCIÓN PRINCIPAL
// ============================================================================

/**
 * Función principal que orquesta el flujo de pruebas.
 * Ejecuta suite de casos de prueba y muestra resultados
 */
const main = async (): Promise<void> => {
  console.log("\n╔════════════════════════════════════════════════════════════════╗");
  console.log("║     INICIO DE LA TAREA 1 : TALLER DOMICILIARIO GRUPAL          ║");
  console.log("╚════════════════════════════════════════════════════════════════╝\n");

  const results: TestResult[] = [];

  // Casos exitosos
  console.log("📋 CASOS EXITOSOS\n");
  results.push(
    executeTest(
      {
        username: "adm.jesus",
        password: "JesusAdmin2026!",
        confirmPassword: "JesusAdmin2026!",
        role: "admin",
      },
      "Registro exitoso - Jesus Martinez (Admin)",
    ),
  );

  results.push(
    executeTest(
      {
        username: "ed.christian",
        password: "ChristianEditor2026!",
        confirmPassword: "ChristianEditor2026!",
        role: "editor",
      },
      "Registro exitoso - Christian Mujica (Editor)",
    ),
  );

  results.push(
    executeTest(
      {
        username: "viewer.ibeth",
        password: "IbethViewer2026!",
        confirmPassword: "IbethViewer2026!",
        role: "viewer",
      },
      "Registro exitoso - Ibeth Fretel (Viewer)",
    ),
  );

  // Casos de error
  console.log("\n❌ CASOS DE VALIDACIÓN\n");
  results.push(
    executeTest(
      {
        username: "ed.christian",
        password: "short",
        confirmPassword: "short",
        role: "editor",
      },
      "Validación: Contraseña demasiado corta",
    ),
  );

  results.push(
    executeTest(
      {
        username: "adm.jesus",
        password: "JesusAdmin2026!",
        confirmPassword: "DifferentPass456!",
        role: "admin",
      },
      "Validación: Contraseñas no coinciden",
    ),
  );

  results.push(
    executeTest(
      {
        username: "viewer.ibeth",
        password: "",
        confirmPassword: "",
        role: "viewer",
      },
      "Validación: Contraseña vacía",
    ),
  );

  // Mostrar resultados
  console.log("\n═══════════════════════════════════════════════════════════════\n");
  for (const result of results) {
    console.log(`${result.name}`);
    console.log(
      result.passed
        ? formatSuccessResult({
            ok: true,
            data: result.data,
            message: "Registro creado exitosamente",
          })
        : formatErrorResult({
            ok: false,
            message: result.error,
          }),
    );
    console.log(`⏱️  ${result.duration.toFixed(2)}ms\n`);
  }

  // Mostrar métricas resumidas
  const passed = results.filter((r) => r.passed).length;
  const failed = results.filter((r) => !r.passed).length;
  const totalDuration = results.reduce((sum, r) => sum + r.duration, 0);
  const successRate = ((passed / results.length) * 100).toFixed(2);

  console.log("═══════════════════════════════════════════════════════════════");
  console.log(`\n📊 RESUMEN`);
  console.log(`  Total: ${results.length} | ✓ Pasadas: ${passed} | ✗ Fallidas: ${failed}`);
  console.log(`  Tasa de éxito: ${successRate}% | Duración total: ${totalDuration.toFixed(2)}ms\n`);
  console.log("╚════════════════════════════════════════════════════════════════╝\n");
};

// Ejecutar
main().catch((error) => {
  console.error("ERROR:", error instanceof Error ? error.message : error);
  process.exit(1);
});

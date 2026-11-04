# Automatización de Pruebas E2E con Playwright

Repositorio académico orientado al desarrollo de **pruebas automatizadas de aplicaciones web**, utilizando Playwright y TypeScript, aplicando buenas prácticas de programación, reutilización y ejecución continua.

## Objetivo

Desarrollar habilidades para implementar y ejecutar pruebas automatizadas, desde interacciones básicas con aplicaciones web hasta la estructuración de frameworks y su integración con herramientas CI/CD.

## Nivel del curso

![Nivel Intermedio](https://img.shields.io/badge/Nivel-INTERMEDIO-2563EB?style=for-the-badge)

El curso abarca desde los fundamentos de automatización hasta la implementación de pruebas estructuradas, reutilizables e integradas con herramientas CI/CD.

**Enfoque:** teórico-práctico, con ejercicios de implementación y ejecución.

## Tecnologías y herramientas

- **Playwright + TypeScript:** desarrollo y ejecución de pruebas automatizadas.
- **Node.js / NPM:** entorno de ejecución y gestión de dependencias.
- **Git / GitHub:** control de versiones.
- **GitHub Actions:** automatización de ejecuciones CI/CD.
- **Docker y Jenkins:** herramientas de contenerización y automatización.

## Conceptos y prácticas

El curso contempla el uso de comandos de navegación e interacción (`goto`, `click`, `fill`), localizadores semánticos y estructurales, aserciones (`toBe`, `toHave`), Page Object Model (POM), helpers reutilizables y gestión de sesiones.

También se trabajan pruebas basadas en datos, peticiones REST, ejecución paralela y distribuida, pruebas Cross-Browser, emulación móvil, generación de reportes y automatización mediante pipelines CI/CD.

## Comandos básicos

### Git

| Comando | Descripción |
|---|---|
| `git clone <url>` | Clonar un repositorio |
| `git branch` | Listar branches locales |
| `git branch --show-current` | Mostrar branch actual |
| `git switch -c nombre-rama` | Crear y cambiar a un nuevo branch |
| `git switch nombre-rama` | Cambiar de branch |
| `git status` | Consultar cambios locales |
| `git add .` | Preparar cambios |
| `git commit -m "mensaje"` | Registrar cambios |
| `git push -u origin nombre-rama` | Publicar un branch en GitHub |
| `git fetch origin` | Actualizar referencias remotas |

### Playwright

| Comando | Descripción |
|---|---|
| `npx playwright test` | Ejecutar pruebas |
| `npx playwright test --ui` | Abrir interfaz interactiva |
| `npx playwright test --debug` | Ejecutar en modo depuración |
| `npx playwright test --headed` | Ejecutar con navegador visible |
| `npx playwright test --workers=3` | Ejecutar con 3 workers |
| `npx playwright test --shard=1/2` | Ejecutar el primer shard de dos |
| `npx playwright test --project=chromium` | Ejecutar proyecto Chromium |
| `npx playwright test --project=firefox` | Ejecutar proyecto Firefox |
| `npx playwright test --project=webkit` | Ejecutar proyecto WebKit |
| `npx playwright test tests/archivo.spec.ts` | Ejecutar un archivo específico |
| `npx playwright show-report` | Abrir reporte HTML |
| `npx playwright install` | Instalar navegadores |

*Nota: los nombres utilizados con `--project` deben estar configurados en `playwright.config.ts`.*

## Organización del repositorio

- **`dev`:** rama principal de referencia del curso.
- **Branches individuales:** cada alumno desarrolla y versiona sus prácticas de manera independiente.

## Última ejecución de Playwright

<!-- PLAYWRIGHT_START -->
**Estado:** Pendiente de ejecución.

Los resultados y evidencias de CI/CD se actualizarán automáticamente en esta sección.
<!-- PLAYWRIGHT_END -->

## Documentación oficial

- [Playwright — Documentación](https://playwright.dev/docs/intro)
- [Playwright — Comandos CLI](https://playwright.dev/docs/test-cli)
- [TypeScript — Documentación](https://www.typescriptlang.org/docs/)
- [Node.js — Documentación](https://nodejs.org/en/learn)
- [Git — Documentación](https://git-scm.com/docs)
- [GitHub Actions — Documentación](https://docs.github.com/en/actions)
- [Docker — Documentación](https://docs.docker.com/)
- [Jenkins — Documentación](https://www.jenkins.io/doc/)

---

*Repositorio con fines educativos y prácticos para el aprendizaje de automatización de pruebas de software.*

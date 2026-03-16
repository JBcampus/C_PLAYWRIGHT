import { defineConfig, devices } from "@playwright/test";
import { DateFormatter } from "./helpers/utils/time.helper";

export default defineConfig({
  testDir: "./tests",
  /* Run tests in files in parallel */
  fullyParallel: true,
  /* Fail the build on CI if you accidentally left test.only in
the source code. */
  forbidOnly: !!process.env.CI,
  /* Retry on CI only */
  retries: process.env.CI ? 2 : 1,
  /* Opt out of parallel tests on CI. */
  //workers: process.env.CI ? 1 : 4,
  workers: process.env.CI ? 1 : 1,
  /* Reporter to use. See https://playwright.dev/docs/testreporters   */
  reporter: [
    ["list", { printSteps: true }],
    [
      "html",
      {
        open: "never",
        outputFolder: `artifacts/playwright-report/result-${DateFormatter(new Date())}`,
      },
    ],
    ["json", { outputFile: `artifacts/test-results/result-${DateFormatter(new Date())}.json` }],
  ],

  // Ruta donde se guardará evidencias de cada ejecución (videos,traces, screenshots)
  outputDir: "artifacts/run",
  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
  use: {
    /* Base URL to use in actions like `await page.goto('')`. */
    // baseURL: 'http://localhost:3000',
    launchOptions: {
      slowMo: 500,
    },
    /* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
    trace: "retain-on-failure",
    screenshot: "only-on-failure",
    video: "retain-on-failure",
  },

  /* Configure projects for major browsers */
  projects: [
    { name: "chromium", use: { ...devices["Desktop Chrome"] } },
      // Proyecto: autenticación (guarda el estado)
    {
      name: "chromium-auth",
      use: { ...devices["Desktop Chrome"] },
      testMatch: /.*suite02-auth\.spec\.ts/,
    },
    
    // Proyecto: buyflow (usa el estado guardado)
    {
      name: "chromium-buyflow",
      use: {
        ...devices["Desktop Chrome"],
        storageState: "state-integrador.json",
      },
      testMatch: /.*suite03-buyflow\.spec\.ts/,
    },

    
    { name: "firefox", use: { ...devices["Desktop Firefox"] } },
    { name: "webkit", use: { ...devices["Desktop Safari"], navigationTimeout: 60000 } },

    // === Dispositivos móviles (emulación) ===
    { name: "Mobile Chrome", use: { ...devices["Pixel 5"] } },
    { name: "Mobile Safari", use: { ...devices["iPhone 14 Pro Max"] } },    
    
  ],
});
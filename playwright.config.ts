import { defineConfig, devices } from "@playwright/test";
import { DateFormatter } from "./helpers/utils/time.helper";
import { CustomDevice, CustomDeviceName } from "./data/CustomDevices";

export default defineConfig({
  testDir: "./tests" /* Run tests in files in parallel */,
  fullyParallel: true,
  /* Fail the build on CI if you accidentally left test.only in the source code. */
  forbidOnly: !!process.env.CI,
  /* Retry on CI only */
  retries: process.env.CI ? 2 : 1,
  /* Opt out of parallel tests on CI. */
  workers: process.env.CI ? 1 : 4,
  /* Reporter to use. See https://playwright.dev/docs/testreporters */
  reporter: [
    ["list", { printSteps: true }],
    [
      "html",
      {
        open: "never",
        outputFolder: `artifacts/playwrightreport/result-${DateFormatter(new Date())}`,
      },
    ],
    ["json", { outputFile: `artifacts/test-results/result${DateFormatter(new Date())}.json` }],
  ],
  // Ruta donde se guardará evidencias de cada ejecución (videos, traces, screenshots)
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
    { name: "firefox", use: { ...devices["Desktop Firefox"] } },
    { name: "webkit", use: { ...devices["Desktop Safari"] } },
    // === Dispositivos móviles (emulación) ===
    { name: "Mobile Chrome", use: { ...devices["Pixel 5"] } },
    { name: "Mobile Safari", use: { ...devices["iPhone 12"] } },

    {
      name: CustomDeviceName.CustomIphone,
      use: { ...CustomDevice[CustomDeviceName.CustomIphone] },
    },
  ],
});

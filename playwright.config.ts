import { CustomDevice, CustomDeviceName } from './data/CustomDevices';
import { DateFormatter } from "./helpers/utils/time.helper"
import { defineConfig, devices } from "@playwright/test";
import { DateFormatter } from "./helpers/utils/time.helper";
import { CustomDevice, CustomDeviceName } from "./data/CustomDevices";

const env =
  (
    globalThis as typeof globalThis & {
      process?: { env?: Record<string, string | undefined> };
    }
  ).process?.env ?? {};

/**
 * Read environment variables from file.
 * https://github.com/motdotla/dotenv
 */
// import dotenv from 'dotenv';
// import path from 'path';
// dotenv.config({ path: path.resolve(__dirname, '.env') });

/**
 * See https://playwright.dev/docs/test-configuration.
 */
export default defineConfig({
  testDir: ".",
  testMatch: ["tests/**/*.spec.ts", "playground/tarea2/**/*.spec.ts"],
  /* Run tests in files in parallel */
  fullyParallel: true,
  /* Fail the build on CI if you accidentally left test.only in the source code. */
  forbidOnly: !!env.CI,
  /* Retry on CI only */
  retries: env.CI ? 2 : 1,
  /* Opt out of parallel tests on CI. */
  workers: env.CI ? 1 : 4,
  /* Reporter to use. See https://playwright.dev/docs/test-reporters */
  reporter: [
    ["list", { printSteps: true }],
    [
      "html",
      {
        open: "never",
        outputFolder: `artifacts/playwright-report/result-${DateFormatter(
          new Date(),
        )}`,
      },
    ],
    [
      "json",
      {
        outputFile: `artifacts/test-results/result-${DateFormatter(new Date())}.json`,
      },
    ],
  ],
  // Ruta donde se guardará evidencias de cada ejecución (videos, traces, screenshots)
  outputDir: "artifacts/run",

  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions.
   */
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
    {
      name: "chromium",
      use: {
        ...devices["Desktop Chrome"],

        testIdAttribute: "data-test",
        launchOptions: { slowMo: 1000 },
      },
    },

    {
      name: "firefox",
      use: { ...devices["Desktop Firefox"] },
    },

    {
      name: "webkit",
      use: { ...devices["Desktop Safari"] },
    },

    /* Test against mobile viewports. */
    {
      name: "Mobile Chrome",
      use: { ...devices["Pixel 5"] },
    },
    {
      name: "Mobile Safari",
      use: { ...devices["iPhone 12"] },
    },
    {
      name: CustomDeviceName.CustomIphone,
      use: {
        ...CustomDevice[CustomDeviceName.CustomIphone],
        browserName: "firefox",
      },
    },
    /* Test against branded browsers. */
    // {
    //   name: 'Microsoft Edge',
    //   use: { ...devices['Desktop Edge'], channel: 'msedge' },
    // },
    // {
    //   name: 'Google Chrome',
    //   use: { ...devices['Desktop Chrome'], channel: 'chrome' },
    // },
  ],

  /* Run your local dev server before starting the tests */
  // webServer: {
  //   command: 'npm run start',
  //   url: 'http://localhost:3000',
  //   reuseExistingServer: !process.env.CI,
  // },
});

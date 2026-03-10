import { expect, test } from "@playwright/test";
test.describe.configure({ mode: "parallel" });
test.describe("T7 · Paralelismo (tests independientes) + Performance Timing", () => {
  test.beforeEach(() => console.log("========INIT========"));
  test.afterEach(() => console.log("========FINISHED========"));
  const urls = [
    "https://example.com",
    "https://playwright.dev",
    "https://www.wikipedia.org",
    "https://www.google.com",
  ];
  for (const u of urls) {
    test(`Smoke: ${u}`, async ({ page }) => {
      const t0 = Date.now();
      await test.step("Navegar y estabilizar", async () => {
        await page.goto(u);
        await expect(page).toHaveTitle(/.+/);
      });
      const elapsed = Date.now() - t0;
      console.log(`[PERF-OP] url="${u}"
operacional_ms=${elapsed}`);
      await test.step("Performance API (Navigation Timing)", async () => {
        const timing = await page.evaluate(() => {
          const nav = window.performance.getEntriesByType("navigation")[0] as
            | PerformanceNavigationTiming
            | undefined;
          if (!nav) return null;
          return {
            domContentLoaded: nav.domContentLoadedEventEnd - nav.startTime,
            loadEvent: nav.loadEventEnd - nav.startTime,
          };
        });
        // Algunas páginas pueden no exponer nav timing como se espera (según redirects/privacidad).
        if (timing) {
          console.log(
            `[PERF-TC] url="${u}"dcl_ms=${Math.round(timing.domContentLoaded)}load_ms=${Math.round(timing.loadEvent)}`,
          );
        } else {
          console.log(`[PERF-TC] url="${u}"navigation_timing=unavailable`);
        }
      });
    });
  }
});

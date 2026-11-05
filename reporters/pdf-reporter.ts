import { chromium } from "@playwright/test";
import type {
  FullResult,
  Reporter,
  TestCase,
  TestResult,
} from "@playwright/test/reporter";
import * as fs from "node:fs";
import * as path from "node:path";

interface StepShot {
  status: string;
  title: string;
  image: string;
}

interface Entry {
  file: string;
  title: string;
  project: string;
  status: string;
  duration: number;
  error: string;
  shots: StepShot[];
}

const escapeHtml = (text: string): string =>
  text
    .replace(/\u001b\[[0-9;]*m/g, "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");

const color = (status: string): string =>
  status === "passed" ? "#1a7f37" : status === "skipped" ? "#9a6700" : "#cf222e";

const timestamp = (): string => {
  const d = new Date();
  const p = (n: number): string => String(n).padStart(2, "0");
  return `${d.getFullYear()}-${p(d.getMonth() + 1)}-${p(d.getDate())}_${p(d.getHours())}-${p(d.getMinutes())}-${p(d.getSeconds())}`;
};

/**
 * Genera reports/report-<fecha>.pdf al terminar cada ejecución, con el resultado
 * de cada test y el screenshot de cada paso (ver helpers/utils/step.helper.ts).
 */
export default class PdfReporter implements Reporter {
  private entries = new Map<string, Entry>();
  private startTime = new Date();

  onTestEnd(test: TestCase, result: TestResult): void {
    // Con reintentos se llama una vez por intento; se conserva el último.
    const shots: StepShot[] = result.attachments
      .filter((a) => a.contentType === "image/png" && a.body && a.name.includes("|"))
      .map((a) => {
        const [status, ...rest] = a.name.split("|");
        return {
          status,
          title: rest.join("|"),
          image: `data:image/png;base64,${a.body!.toString("base64")}`,
        };
      });

    this.entries.set(test.id, {
      file: path.relative(process.cwd(), test.location.file),
      title: test.titlePath().slice(3).join(" › "),
      project: test.titlePath()[1] ?? "",
      status: result.status,
      duration: result.duration,
      error: result.error?.message ?? "",
      shots,
    });
  }

  async onEnd(_result: FullResult): Promise<void> {
    const entries = [...this.entries.values()];
    if (entries.length === 0) {
      return;
    }
    try {
      const outputPath = path.join(process.cwd(), "reports", `report-${timestamp()}.pdf`);
      fs.mkdirSync(path.dirname(outputPath), { recursive: true });

      const browser = await chromium.launch();
      try {
        const page = await browser.newPage();
        await page.setContent(this.buildHtml(entries));
        await page.pdf({
          path: outputPath,
          format: "A4",
          landscape: true,
          printBackground: true,
          margin: { top: "15mm", bottom: "15mm", left: "10mm", right: "10mm" },
        });
      } finally {
        await browser.close();
      }
      console.log(`PDF generated: ${outputPath}`);
    } catch (error) {
      console.error("No se pudo generar el PDF:", error);
    }
  }

  private buildHtml(entries: Entry[]): string {
    const passed = entries.filter((e) => e.status === "passed").length;
    const failed = entries.filter((e) => e.status === "failed" || e.status === "timedOut").length;
    const other = entries.length - passed - failed;

    const sections = entries
      .map((e) => {
        const shots = e.shots
          .map(
            (s, i) => `<div class="shot">
              <div class="step" style="color:${color(s.status)}">Paso ${i + 1} (${escapeHtml(s.status)}): ${escapeHtml(s.title)}</div>
              <img src="${s.image}">
            </div>`,
          )
          .join("");
        return `<section>
          <h2>${escapeHtml(e.title)}</h2>
          <p>${escapeHtml(e.file)} | ${escapeHtml(e.project)} |
             <b style="color:${color(e.status)}">${escapeHtml(e.status)}</b> | ${(e.duration / 1000).toFixed(1)}s</p>
          ${e.error ? `<pre>${escapeHtml(e.error)}</pre>` : ""}
          ${shots}
        </section>`;
      })
      .join("");

    return `<!doctype html><html><head><meta charset="utf-8"><style>
      body { font-family: Arial, sans-serif; font-size: 12px; }
      section { page-break-before: always; }
      section:first-of-type { page-break-before: auto; }
      h2 { font-size: 15px; margin-bottom: 4px; }
      .shot { page-break-inside: avoid; margin: 10px 0; }
      .step { font-weight: bold; margin-bottom: 4px; }
      img { max-width: 70%; border: 1px solid #ccc; }
      pre { white-space: pre-wrap; font-size: 10px; color: #cf222e; }
    </style></head><body>
      <h1>Playwright test results</h1>
      <p>Run: ${this.startTime.toLocaleString()}<br>
         Total: ${entries.length} | Passed: ${passed} | Failed: ${failed} | Other: ${other}</p>
      ${sections}
    </body></html>`;
  }
}

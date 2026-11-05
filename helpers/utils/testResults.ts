export interface StepResult {
  step: string;
  status: "PASSED" | "FAILED";
}

export interface TestResult {
  testName: string;
  status: string;
  screenshot: string;
  steps: StepResult[];
}

export const results: TestResult[] = [];
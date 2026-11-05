import { StepResult } from "./testResults";

export async function trackedStep(
  name: string,
  fn: () => Promise<void>,
  steps: StepResult[]
) {
  try {
    await fn();

    steps.push({
      step: name,
      status: "PASSED",
    });
  } catch (error) {
    steps.push({
      step: name,
      status: "FAILED",
    });

    throw error;
  }
}
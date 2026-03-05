type LoginCase = {
  name: string;
  username: string;
  password: string;
  shouldPass: boolean;
  expectedError?: RegExp;
};
export const loginCases: LoginCase[] = [
  {
    name: "standard_user - válido",
    username: "standard_user",
    password: "secret_sauce",
    shouldPass: true,
  },
  {
    name: "locked_out_user - bloqueado",
    username: "locked_out_user",
    password: "secret_sauce",
    shouldPass: false,
    expectedError: /locked out/i,
  },
  {
    name: "problem_user - válido",
    username: "problem_user",
    password: "secret_sauce",
    shouldPass: true,
  },
  {
    name: "performance_glitch_user - válido (lento)",
    username: "performance_glitch_user",
    password: "secret_sauce",
    shouldPass: true,
  },
];

import { Page } from "@playwright/test";

export class UserHelper {
  constructor(private page: Page) {}

  getTestUser(data: "valido" | "invalido") {
    const users = {
      valido: { username: "standard_user", password: "secret_sauce" },
      invalido: { username: "invalid", password: "secret_sauce" },
    };

    return users[data];
  }
}

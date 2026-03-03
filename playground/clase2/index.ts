import type { Credentials } from "./typex";
import { login, formatUser } from "./validate";

const main = async () => {
  const candidates: Credentials[] = [
    { username: "adm.jesus", password: "permitido" },
    { username: "ed.jesus", password: "permitido" },
    { username: "viewer.andres", password: "error" },
  ];

  for (const creds of candidates) {
    const res = await login(creds);
    if (res.ok && res.data) {
      console.log("Login exitoso", formatUser(res.data));
    } else {
      console.log("Login fallido", creds.username, res.message);
    }
  }
};

main();

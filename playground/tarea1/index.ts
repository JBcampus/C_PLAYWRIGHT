import type { Credentials } from "./registerTypes";
import { formatUser, login } from "./registerValidate";

/** Función principal: orquesta proceso y muestra resultados. */
const main = async () => {
  const candidates: Credentials[] = [
    { username: "adm.paola", password: "permitido" },
    { username: "ed.angela", password: "permitido" },
    { username: "viewer.claudio", password: "error" },
  ];
  for (const c of candidates) {
    const res = await login(c);
    if (res.ok && res.data) {
      console.log("Login:", formatUser(res.data));
    } else {
      console.log("Error:", c.username, res.message);
    }
  }
};

main();
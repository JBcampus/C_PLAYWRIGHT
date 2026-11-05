import type { Credentials } from "./registerTypes";
import { emailFor, formatUser, login } from "./registerValidate";

/** Función principal: orquesta proceso y muestra resultados. */
const main = async () => {
  const candidates: Credentials[] = [
    { username: "adm.paola", password: "abc123" , confirmPassword: "abc123" },
    { username: "ed.angela", password: "def456" , confirmPassword: "def456" },
    { username: "viewer.claudio", password: "erro2" , confirmPassword: "erro4" },
  ];
  for (const c of candidates) {
    const res = await login(c);
    if (res.ok && res.data) {
      console.log("Login:", formatUser(res.data));
    } else {
      console.log("Error:", `${c.username} (${emailFor(c.username)})`, res.message);
    }
  }
};

main();
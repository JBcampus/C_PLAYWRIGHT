import type { Credentials } from "./types";
import { formatUser, login } from "./validate";

/** Función principal: orquesta proceso y muestra resultados. */
const main = async () => {
  const candidates: Credentials[] = [
    { username: "adm.carla", password: "permitido" },
    { username: "ed.ana", password: "permitido" },
    { username: "viewer.pepe", password: "error" },
    { username: "viewer.carlos", password: "permitido"}
  ];

  for (const c of candidates) {
    const res = await login(c);
    if (res.ok && res.data ) {
      console.log("Login:", formatUser(res.data));
    } else {
      console.log("Error:", c.username, res.message);
    }
  }
};

main();

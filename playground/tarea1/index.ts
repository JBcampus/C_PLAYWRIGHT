import type { Register } from "./types";
import { formatUser, login } from "./validate";
/** Función principal: orquesta proceso y muestra resultados. */

/*
const main = async () => {
  const candidates: Credentials[] = [
    { username: "adm.carla", password: "permitido" },
    { username: "ed.ana", password: "permitido" },
    { username: "viewer.pepe", password: "error" },
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
*/

const main = async () => {
  const registros: Register[] = [
    { username: "adan", password: "123456", confirmPassword: "123456", role: "viewer" },
    { username: "mateo", password: "1234567", confirmPassword: "123456abc", role: "editor" },
    { username: "andres", password: "clave", confirmPassword: "clave", role: "viewer" },
    { username: "juan", password: "123456", confirmPassword: "123456", role: "editor" },
    { username: "edgar", password: "123ABC", confirmPassword: "123ABC", role: "admin" },
  ];
  for (const c of registros) {
    const res = await login(c);
    if (res.ok && res.data) {
      console.log("Registro:", formatUser(res.data));
    } else {
      console.log("Error:", c.username, res.message);
    }
  }
};

main();

/** Función principal: orquesta proceso y muestra resultados. */

import { Register } from "./registerTypes";
import { formatUser, login } from "./registerValidate";

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

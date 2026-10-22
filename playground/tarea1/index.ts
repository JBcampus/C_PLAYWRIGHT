import type { Register } from "./registerTypes";
import { formatUser, login } from "./registerValidate";

/** Función principal: orquesta proceso y muestra resultados. */
const main = async () => {
  const candidates: Register[] = [
    {
      username: "Carla",
      password: "test",
      confirmPassword: "test",
      role: "admin",
    },
    {
      username: "Ana",
      password: "test123",
      confirmPassword: "test1234",
      role: "editor",
    },
    {
      username: "Pepe",
      password: "test123",
      confirmPassword: "test123",
      role: "viewer",
    },
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

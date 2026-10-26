import type { RegisterUser } from "./registerTypes";
import { formatUser, registerUsr } from "./registerValidate";

/** Función principal: orquesta proceso y muestra resultados. */
const main = async () => {
  const candidates: RegisterUser[] = [
    { username: "Carla", password: "123456", confirmPassword: "123456", role2: "admin", },
    { username: "Ana", password: "123456", confirmPassword: "123456", role2: "editor",  },
    { username: "Pedro", password: "123", confirmPassword: "123456", role2: "viewer",   },
    { username: "Ines", password: "123456", confirmPassword: "123455", role2: "viewer", },
  ];
  for (const c of candidates) {
    const res = await registerUsr(c);
    if (res.ok && res.data) {
      console.log("Usuario registrado:", formatUser(res.data));
    } else {
      console.log("Error al registrar:", c.username, res.message);
    }
  }
};

main();

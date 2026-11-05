import type { Register } from "./registerTypes";
import { register } from "./registerValidate";

/** Ejecuta ejemplos de registro y muestra sus resultados. */
const main = async (): Promise<void> => {
  const registrations: Register[] = [
    // Éxito: contraseña justo en el mínimo y rol admin.
    {
      username: "jose",
      password: "123456",
      confirmPassword: "123456",
      role: "admin",
    },

    // Éxito: contraseña más larga y rol editor.
    {
      username: "carlos",
      password: "clave-segura",
      confirmPassword: "clave-segura",
      role: "editor",
    },

    // Éxito: rol viewer.
    {
      username: "pepe",
      password: "abcdef",
      confirmPassword: "abcdef",
      role: "viewer",
    },

    // Error: contraseña demasiado corta.
    {
      username: "ana",
      password: "12345",
      confirmPassword: "12345",
      role: "viewer",
    },

    // Error: contraseña vacía.
    {
      username: "maria",
      password: "",
      confirmPassword: "",
      role: "editor",
    },

    // Error: contraseña y confirmación diferentes.
    {
      username: "ernesto",
      password: "abcdef",
      confirmPassword: "abcdeg",
      role: "admin",
    },

    // Error: rol inválido.
    {
      username: "orlando",
      password: "123456",
      confirmPassword: "123456",
      role: "guest" as unknown as Register["role"],
    }
  ];

  for (const registration of registrations) {
    const result = await register(registration);

    if (result.ok && result.data) {
      const { id, username, role, email } = result.data;
      console.log("Usuario registrado:", { id, username, role, email });
    } else {
      console.log("Error con el usuario ", registration.username, ".", result.message);
    }
  }
};

main().catch((error: unknown) => {
  console.error("Error inesperado durante el registro:", error);
  process.exitCode = 1;
});

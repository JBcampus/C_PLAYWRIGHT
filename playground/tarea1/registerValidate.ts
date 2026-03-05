import { randomUUID } from "crypto";
import { Credentials, Result, Role, User } from "../clase2/types";

export const login = async (creds: Credentials): Promise<Result<User>> => {
  const { username, password } = creds;

  // Validaciones.
  if (password !== "permitido") {
    return { ok: false, message: "Credenciales inválidas" };
  }

  //simulación validación pesada
  await new Promise<void>((r) => setTimeout(r, 5000));
  const role: Role = username.startsWith("adm")
    ? "admin"
    : username.startsWith("ed")
      ? "editor"
      : "viewer";
  const user: User = {
    id: randomUUID(),
    username,
    role,
  };
  return { ok: true, data: user };
};

/** Formatea un usuario para mostrar en log. */
export const formatUser = (u: User): string => `[${u.role}]
${u.username} (${u.id})`;

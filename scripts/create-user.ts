// scripts/create-user.ts
import { db } from "../src/db/client.js";
import { users } from "../src/db/schema.js";
import { hashPassword } from "../src/shared/bcrypt.js";

async function main() {
  const email = "owner@gmail.com";
  const plainPassword = "owner123";

  const passwordHash = await hashPassword(plainPassword);

  const [user] = await db
    .insert(users)
    .values({ email, passwordHash, role: "owner" })
    .returning();

  console.log("Usuario creado:", user);
  process.exit(0);
}

main();

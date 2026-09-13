import { eq } from "drizzle-orm";
import { db } from "../../db/client.js";
import { users } from "../../db/schema.js";
import { verifyPassword } from "../../shared/bcrypt.js";
import { signToken } from "../../shared/jwt.js";
import { InvalidCredentialsError } from "../../shared/errors.js";

type LoginInput = {
  email: string;
  password: string;
};

type LoginResult = {
  token: string;
  user: {
    id: string;
    email: string;
    role: string;
  };
};

export async function login({ email, password }: LoginInput): Promise<LoginResult> {
  const [user] = await db
    .select()
    .from(users)
    .where(eq(users.email, email))
    .limit(1);

  if (!user) {
    throw new InvalidCredentialsError();
  }

  if (!user.isActive) {
    throw new InvalidCredentialsError();
  }

  const passwordMatches = await verifyPassword(password, user.passwordHash);

  if(!passwordMatches){
    throw new InvalidCredentialsError();
  }

  const token = signToken({ userId: user.id, role: user.role});

  return {
    token,
    user: {
        id: user.id,
        email: user.email,
        role: user.role,
    },
  };
}



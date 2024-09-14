import Credentials from "@auth/core/providers/credentials"
import type { AuthConfig } from "@hono/auth-js"
import { compareSync } from "bcrypt-ts"
import { drizzle } from "drizzle-orm/d1"
import type { Context } from "hono"
import { schema } from "~/lib/schema"
import { eq } from "drizzle-orm"

export function authConfig(c: Context): AuthConfig {
  return {
    secret: c.env.AUTH_SECRET,
    providers: [
      Credentials({
        type: "credentials",
        credentials: {
          email: { type: "text" },
          password: { type: "password" },
        },
        async authorize(credentials) {
          if (typeof credentials.email !== "string") {
            return null
          }
          if (typeof credentials.password !== "string") {
            return null
          }

          const db = drizzle(c.env.DB)

          const user = await db
            .select()
            .from(schema.users)
            .where(eq(schema.users.login, credentials.email))
            .get()

          if (user === undefined) {
            return null
          }

          if (user.login !== credentials.email) {
            return null
          }

          if (typeof user.hashedPassword !== "string") {
            return null
          }
          const result = compareSync(credentials.password, user.hashedPassword)

          if (result === false) {
            return null
          }

          return {
            id: user.id,
            email: user.login,
          }
        },
      }),
    ],
  }
}

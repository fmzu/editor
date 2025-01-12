import { vValidator } from "@hono/valibot-validator"
import { object, string } from "valibot"
import { apiFactory } from "~/interface/api-factory"
import { drizzle } from "drizzle-orm/d1"
import { genSaltSync, hashSync } from "bcrypt-ts"
import { schema } from "~/lib/schema"
import { HTTPException } from "hono/http-exception"

/**
 * アカウントを作成する
 */
export const POST = apiFactory.createHandlers(
  vValidator(
    "json",
    object({
      email: string(),
      password: string(),
    }),
  ),
  async (c) => {
    const json = c.req.valid("json")

    const db = drizzle(c.env.DB)

    const salt = genSaltSync(10)

    const hashedPassword = hashSync(json.password, salt)

    const userUuid = crypto.randomUUID()

    await db.insert(schema.users).values({
      id: userUuid,
      email: json.email,
      hashedPassword: hashedPassword,
      login: crypto.randomUUID(),
      name: crypto.randomUUID(),
    })

    return c.json({}, {})
  },
)

/**
 * たくさんのアカウントを取得する
 */
export const GET = apiFactory.createHandlers(async (c) => {
  const db = drizzle(c.env.DB)

  const users = await db.select().from(schema.users)

  if (users === undefined) {
    throw new HTTPException(500, { message: "Not Found" })
  }

  const usersJson = users.map((user) => {
    return {
      id: user.id,
      name: user.name,
    }
  })

  return c.json(usersJson)
})

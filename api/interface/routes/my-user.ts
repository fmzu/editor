import { verifyAuth } from "@hono/auth-js"
import { vValidator } from "@hono/valibot-validator"
import { genSaltSync, hashSync } from "bcrypt-ts"
import { eq } from "drizzle-orm"
import { drizzle } from "drizzle-orm/d1"
import { HTTPException } from "hono/http-exception"
import { object, string } from "valibot"
import { schema } from "~/lib/schema"
import { apiFactory } from "~/interface/api-factory"

/**
 * 任意のユーザーを取得する
 */
export const GET = apiFactory.createHandlers(verifyAuth(), async (c) => {
  const db = drizzle(c.env.DB, { schema })

  const auth = c.get("authUser")

  const authUserEmail = auth.token?.email ?? null

  if (authUserEmail === null) {
    throw new HTTPException(401, { message: "Unauthorized11" })
  }

  const user = await db.query.users.findFirst({
    where: eq(schema.users.email, authUserEmail),
  })

  if (user === undefined) {
    throw new HTTPException(404, { message: "Not found" })
  }

  const userJson = { ...user }

  return c.json(userJson)
})

/**
 * 任意のユーザーを修正する
 * パスワードの変更
 */
export const PUT = apiFactory.createHandlers(
  /**
   * verifyAuth()はバリデートの前じゃないとエラー出る！↓
   * TypeError: This ReadableStream is disturbed (has already been read from), and cannot be used as a body.
   */
  verifyAuth(),
  vValidator(
    "json",
    object({
      password: string(),
    }),
  ),
  async (c) => {
    const json = c.req.valid("json")

    const db = drizzle(c.env.DB, { schema })

    const auth = c.get("authUser")

    const authUserEmail = auth.token?.email ?? null

    if (authUserEmail === null) {
      throw new HTTPException(401, { message: "Unauthorized22" })
    }

    const user = await db.query.users.findFirst({
      where: eq(schema.users.email, authUserEmail),
    })

    if (user === undefined) {
      throw new HTTPException(404, { message: "Not found" })
    }

    /**
     * パスワードをハッシュ化する
     */
    const salt = genSaltSync(10)

    const hashedPassword = hashSync(json.password, salt)

    await db
      .update(schema.users)
      .set({
        hashedPassword: hashedPassword,
      })
      .where(eq(schema.users.email, authUserEmail))

    return c.json({})
  },
)

/**
 * アカウントを削除する
 */
export const DELETE = apiFactory.createHandlers(async (c) => {
  const db = drizzle(c.env.DB, { schema })

  const userId = c.req.param("user")

  await db.delete(schema.users).where(eq(schema.users.id, userId))

  return c.json({})
})

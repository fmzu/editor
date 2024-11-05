import { verifyAuth } from "@hono/auth-js"
import { vValidator } from "@hono/valibot-validator"
import { genSaltSync, hashSync } from "bcrypt-ts"
import { eq } from "drizzle-orm"
import { drizzle } from "drizzle-orm/d1"
import { HTTPException } from "hono/http-exception"
import { object, string } from "valibot"
import { schema } from "~/lib/schema"
import { apiFactory } from "../api-factory"

const app = apiFactory.createApp()

export const myUserRoutes = app
  /**
   * 任意のユーザーを取得する
   */
  .get(
    "/my/user",
    /**
     * verifyAuth()がログイン認証を行っている
     */
    verifyAuth(),
    async (c) => {
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
    },
  )
  /**
   * 任意のユーザーを修正する
   * パスワードの変更
   */
  .put(
    "/my/user",
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
    verifyAuth(),
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

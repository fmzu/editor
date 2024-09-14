import { verifyAuth } from "@hono/auth-js"
import { vValidator } from "@hono/valibot-validator"
import { eq } from "drizzle-orm"
import { drizzle } from "drizzle-orm/d1"
import { HTTPException } from "hono/http-exception"
import { object, string } from "valibot"
import { apiFactory } from "~/interface/api-factory"
import { schema } from "~/lib/schema"

const app = apiFactory.createApp()

export const postRoutes = app
  /**
   * 投稿を作成する
   */
  .post(
    "/",
    verifyAuth(),
    vValidator(
      "json",
      object({
        dots: string(),
      }),
    ),
    async (c) => {
      const auth = c.get("authUser")
      console.log("auth", auth)

      const authUserEmail = auth.token?.email ?? null
      console.log("authUserId", authUserEmail)

      if (authUserEmail === null) {
        throw new HTTPException(401, { message: "Unauthorized" })
      }

      const json = c.req.valid("json")

      const db = drizzle(c.env.DB, { schema })

      const user = await db
        .select()
        .from(schema.users)
        .where(eq(schema.users.email, authUserEmail))
        .get()

      if (user === undefined) {
        throw new HTTPException(401, { message: "Unauthorized" })
      }

      await db.insert(schema.posts).values({
        id: crypto.randomUUID(),
        userId: user.id,
        name: crypto.randomUUID(),
        dots: json.dots,
        regulation: "DEFAULT",
      })

      return c.json({})
    },
  )
  /**
   * 投稿を取得する
   */
  .get("/:post", async (c) => {
    return c.json({})
  })
  /**
   * 投票箱を更新する
   */
  .put(
    "/:post",
    vValidator(
      "json",
      object({
        title: string(),
        description: string(),
      }),
    ),
    async (c) => {
      return c.json({})
    },
  )
  /**
   * 投票箱を削除する
   */
  .delete(
    "/:post",
    vValidator(
      "json",
      object({
        id: string(),
      }),
    ),
    async (c) => {
      return c.json({})
    },
  )

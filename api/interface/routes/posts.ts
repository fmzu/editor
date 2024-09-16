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

      const authUserEmail = auth.token?.email ?? null

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
   * たくさんの投稿を取得する
   */
  .get("/", async (c) => {
    const db = drizzle(c.env.DB, { schema })

    const posts = await db.select().from(schema.posts)

    const postsJson = posts.map((post) => {
      return {
        ...post,
      }
    })

    return c.json(postsJson)
  })
  /**
   * 一つの投稿を取得する
   */
  .get("/:post", async (c) => {
    const db = drizzle(c.env.DB, { schema })

    const postId = c.req.param("post")

    const post = await db
      .select()
      .from(schema.posts)
      .where(eq(schema.posts.id, postId))
      .get()

    if (post === undefined) {
      throw new HTTPException(404, { message: "Not found" })
    }

    const postJson = { ...post }

    return c.json(postJson)
  })
  /**
   * 投稿を更新する
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
   * 投稿を削除する
   */
  .delete("/:post", async (c) => {
    const db = drizzle(c.env.DB, { schema })

    const postId = c.req.param("post")

    await db
      .update(schema.posts)
      .set({ isDeleted: true })
      .where(eq(schema.posts.id, postId))

    return c.json({})
  })

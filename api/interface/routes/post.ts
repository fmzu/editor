import { verifyAuth } from "@hono/auth-js"
import { vValidator } from "@hono/valibot-validator"
import { eq } from "drizzle-orm"
import { drizzle } from "drizzle-orm/d1"
import { HTTPException } from "hono/http-exception"
import { boolean, object, string } from "valibot"
import { apiFactory } from "~/interface/api-factory"
import { schema } from "~/lib/schema"

/**
 * 一つの投稿を取得する
 */
export const GET = apiFactory.createHandlers(
  verifyAuth(),
  vValidator("param", object({ post: string() })),
  async (c) => {
    const db = drizzle(c.env.DB, { schema })

    const auth = c.get("authUser")

    const authUserEmail = auth.token?.email ?? null

    const postId = c.req.param("post")

    const post = await db
      .select()
      .from(schema.posts)
      .where(eq(schema.posts.id, postId))
      .get()

    if (post === undefined) {
      throw new HTTPException(404, { message: "Not found" })
    }

    if (authUserEmail === null) {
      const isMine = false

      const postJson = { ...post, isMine }

      return c.json(postJson)
    }

    const user = await db
      .select()
      .from(schema.users)
      .where(eq(schema.users.email, authUserEmail))
      .get()

    if (user === undefined) {
      throw new HTTPException(401, { message: "Unauthorized" })
    }

    const userId = user.id

    const isMine = post.userId === userId

    const postJson = { ...post, isMine }

    return c.json(postJson)
  },
)

/**
 * 投稿を更新する
 */
export const PUT = apiFactory.createHandlers(
  verifyAuth(),
  vValidator("param", object({ post: string() })),
  vValidator(
    "json",
    object({
      dots: string(),
      title: string(),
      description: string(),
      isPublic: boolean(),
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

    const user = await db.query.users.findFirst({
      where: eq(schema.users.email, authUserEmail),
    })

    if (user === undefined) {
      throw new HTTPException(401, { message: "Unauthorized" })
    }

    const postId = c.req.param("post")

    await db
      .update(schema.posts)
      .set({
        dots: json.dots,
        title: json.title,
        description: json.description,
        isPublic: json.isPublic,
      })
      .where(eq(schema.posts.id, postId))

    return c.json({})
  },
)

/**
 * 投稿を削除する
 */
export const DELETE = apiFactory.createHandlers(
  verifyAuth(),
  vValidator("param", object({ post: string() })),
  async (c) => {
    const db = drizzle(c.env.DB, { schema })

    const postId = c.req.param("post")

    await db.delete(schema.posts).where(eq(schema.posts.id, postId))

    return c.json({})
  },
)

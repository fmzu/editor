import { verifyAuth } from "@hono/auth-js"
import { vValidator } from "@hono/valibot-validator"
import { drizzle } from "drizzle-orm/d1"
import { HTTPException } from "hono/http-exception"
import { and, eq } from "drizzle-orm"
import { object, string } from "valibot"
import { apiFactory } from "~/interface/api-factory"
import { schema } from "~/lib/schema"

/**
 * いいねを作成する
 */
export const POST = apiFactory.createHandlers(
  verifyAuth(),
  vValidator("param", object({ post: string() })),
  async (c) => {
    /**
     * 認証ユーザを取得する
     */
    const auth = c.get("authUser")

    const authUserEmail = auth.token?.email ?? null

    if (authUserEmail === null) {
      throw new HTTPException(401, { message: "Unauthorized" })
    }

    const db = drizzle(c.env.DB, { schema })

    /**
     * 対象のユーザを取得する
     */
    const user = await db
      .select()
      .from(schema.users)
      .where(eq(schema.users.email, authUserEmail))
      .get()

    if (user === undefined) {
      throw new HTTPException(401, { message: "Unauthorized" })
    }

    const postId = c.req.param("post")

    if (postId === undefined) {
      throw new HTTPException(400, { message: "Bad Request" })
    }

    /**
     * すでに登録されているかどうかを確認する
     */
    const like = await db
      .select()
      .from(schema.likes)
      .where(
        and(eq(schema.likes.userId, user.id), eq(schema.likes.postId, postId)),
      )
      // 一つのみ取得する。なかったら配列になる
      .get()

    // すでに登録されている場合はいいねを外す
    if (like !== undefined) {
      await db
        .update(schema.likes)
        .set({ isDeleted: true })
        .where(eq(schema.likes.id, like.id))

      return c.json({})
    }

    return c.json({})
  },
)

/**
 * 複数のいいねを取得する
 */
export const GET = apiFactory.createHandlers(
  vValidator("param", object({ post: string() })),
  async (c) => {
    return c.json({})
  },
)

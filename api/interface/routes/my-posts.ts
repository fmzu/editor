import { verifyAuth } from "@hono/auth-js"
import { drizzle } from "drizzle-orm/d1"
import { HTTPException } from "hono/http-exception"
import { apiFactory } from "~/interface/api-factory"
import { schema } from "~/lib/schema"
import { desc, eq } from "drizzle-orm"

/**
 * 自分の投稿を取得する
 */
export const GET = apiFactory.createHandlers(verifyAuth(), async (c) => {
  const auth = c.get("authUser")

  const authUserEmail = auth.token?.email ?? null

  if (authUserEmail === null) {
    throw new HTTPException(401, { message: "Unauthorized" })
  }

  const db = drizzle(c.env.DB, { schema })

  const user = await db.query.users.findFirst({
    where: eq(schema.users.email, authUserEmail),
  })

  if (user === undefined) {
    throw new HTTPException(404, { message: "User not found" })
  }

  const posts = await db.query.posts.findMany({
    where: eq(schema.posts.userId, user.id),
    orderBy: desc(schema.posts.createdAt),
  })

  const postsJson = posts.map((post) => {
    return {
      isMine: true,
      ...post,
    }
  })

  return c.json(postsJson)
})

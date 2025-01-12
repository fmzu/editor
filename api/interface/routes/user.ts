import { object, string } from "valibot"
import { apiFactory } from "~/interface/api-factory"
import { drizzle } from "drizzle-orm/d1"
import { schema } from "~/lib/schema"
import { HTTPException } from "hono/http-exception"
import { eq } from "drizzle-orm"
import { vValidator } from "@hono/valibot-validator"

/**
 * 一つのアカウントを取得する
 */
export const GET = apiFactory.createHandlers(
  vValidator(
    "param",
    object({
      user: string(),
    }),
  ),
  async (c) => {
    const db = drizzle(c.env.DB)

    const userId = c.req.param("user")

    const user = await db
      .select()
      .from(schema.users)
      .where(eq(schema.users.id, userId))
      .get()

    if (user === undefined) {
      throw new HTTPException(500, { message: "Not Found" })
    }

    const userJson = {
      id: user.id,
      name: user.name,
      avatarIconUrl: user.avatarIconUrl,
    }

    return c.json(userJson)
  },
)

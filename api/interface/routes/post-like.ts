import { vValidator } from "@hono/valibot-validator"
import { object, string } from "valibot"
import { apiFactory } from "~/interface/api-factory"

/**
 * いいねを削除する
 */
export const DELETE = apiFactory.createHandlers(
  vValidator(
    "param",
    object({
      post: string(),
      like: string(),
    }),
  ),
  async (c) => {
    return c.json({})
  },
)

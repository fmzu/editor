import { vValidator } from "@hono/valibot-validator"
import { number, object, string } from "valibot"
import { apiFactory } from "~/interface/api-factory"

const app = apiFactory.createApp()

export const likeRoutes = app
  /**
   * いいねを作成する
   */
  .post(
    "/",
    vValidator(
      "json",
      object({
        postId: string(),
        userId: number(),
      }),
    ),
    async (c) => {
      return c.json({})
    },
  )
  /**
   * いいねを削除する
   */
  .put(
    "/:like",
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

import { vValidator } from "@hono/valibot-validator"
import { object, string } from "valibot"
import { apiFactory } from "~/interface/api-factory"

const app = apiFactory.createApp()

export const postRoutes = app
  /**
   * 投稿を作成する
   */
  .post(
    "/",
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
   * 投稿を取得する
   */
  .get("/:post", async (c) => {
    return c.json({})
  })
  /**
   * 投票箱を更新する
   */
  .put("/:post", async (c) => {
    return c.json({})
  })
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

import { vValidator } from "@hono/valibot-validator"
import { object, string } from "valibot"
import { apiFactory } from "~/interface/api-factory"

const app = apiFactory.createApp()

export const userRoutes = app
  /**
   * アカウントを作成する
   */
  .post(
    "/",
    vValidator(
      "json",
      object({
        email: string(),
        password: string(),
      }),
    ),
    async (c) => {
      return c.json({})
    },
  )
  /**
   * アカウントを取得する
   */
  .get("/:user", async (c) => {
    return c.json({})
  })
  /**
   * アカウントを更新する
   */
  .put("/:user", async (c) => {
    return c.json({})
  })
  /**
   * アカウントを削除する
   */
  .put(
    "/:user",
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

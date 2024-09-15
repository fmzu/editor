import { vValidator } from "@hono/valibot-validator"
import { object, string } from "valibot"
import { apiFactory } from "~/interface/api-factory"
import { drizzle } from "drizzle-orm/d1"
import { genSaltSync, hashSync } from "bcrypt-ts"
import { schema } from "~/lib/schema"
import { HTTPException } from "hono/http-exception"

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
      const json = c.req.valid("json")

      const db = drizzle(c.env.DB)

      const salt = genSaltSync(10)

      const hashedPassword = hashSync(json.password, salt)

      const userUuid = crypto.randomUUID()

      await db.insert(schema.users).values({
        id: userUuid,
        email: json.email,
        hashedPassword: hashedPassword,
        login: crypto.randomUUID(),
        name: crypto.randomUUID(),
      })

      return c.json({}, {})
    },
  )
  /**
   * アカウントを取得する
   */
  .get("/", async (c) => {
    const db = drizzle(c.env.DB)

    const users = await db.select().from(schema.users)

    if (users === undefined) {
      throw new HTTPException(500, { message: "Not Found" })
    }

    const usersJson = users.map((user) => {
      return {
        id: user.id,
        name: user.name,
      }
    })

    return c.json(usersJson)
  })
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

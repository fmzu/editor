import { cors } from "hono/cors"
import { honoFactory } from "~/interface/hono-factory"
import { likeRoutes } from "~/interface/routes/likes"
import { postRoutes } from "~/interface/routes/posts"
import { userRoutes } from "~/interface/routes/users"

const app = honoFactory.createApp()

export const api = app
  .use(cors())
  .get("/", (c) => {
    return c.text("Hello Hono!")
  })
  .route("/posts", postRoutes)
  .route("/users", userRoutes)
  .route("/likes", likeRoutes)

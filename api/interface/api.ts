import { authHandler, initAuthConfig } from "@hono/auth-js"
import { cors } from "hono/cors"
import { authConfig } from "~/interface/auth-config"
import { apiFactory } from "~/interface/api-factory"
import { likeRoutes } from "~/interface/routes/likes"
import { postRoutes } from "~/interface/routes/posts"
import { userRoutes } from "~/interface/routes/users"

export const api = apiFactory
  .createApp()
  .basePath("/api")
  .use(cors())
  .use("*", initAuthConfig(authConfig))
  .use("/auth/*", authHandler())
  .route("/posts", postRoutes)
  .route("/users", userRoutes)
  .route("/likes", likeRoutes)

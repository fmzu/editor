import type { Api } from "~/../api"
import { hc } from "hono/client"

export const client = hc<Api>("/")

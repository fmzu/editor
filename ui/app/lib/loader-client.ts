import type api from "api"
import { hc } from "hono/client"

export const loaderClient = hc<typeof api>(import.meta.env.VITE_API_URL, {})

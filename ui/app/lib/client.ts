import type api from "api"
import { hc } from "hono/client"

export const client = hc<typeof api>(import.meta.env.VITE_API_URL, {
  fetch(input: RequestInfo | URL, init?: RequestInit) {
    return fetch(input, { ...init, credentials: "include" })
  },
})

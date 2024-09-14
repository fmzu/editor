import { createFactory } from "hono/factory"
import type { Env } from "~/worker-configuration"

export const apiFactory = createFactory<{ Bindings: Env }>()

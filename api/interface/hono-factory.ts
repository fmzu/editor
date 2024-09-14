import { createFactory } from "hono/factory"
import type { Env } from "~/worker-configuration"

export const honoFactory = createFactory<{ Bindings: Env }>()

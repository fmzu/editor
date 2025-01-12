import type { PlatformProxy } from "wrangler"
import type { Env } from "./worker-configuration"

type GetLoadContextArgs = {
  request: Request
  context: {
    cloudflare: Omit<PlatformProxy<Env>, "dispose" | "caches" | "cf"> & {
      caches: PlatformProxy<Env>["caches"] | CacheStorage
      cf: Request["cf"]
    }
  }
}

declare module "react-router" {
  interface AppLoadContext extends ReturnType<typeof getLoadContext> {}
}

export function getLoadContext(args: GetLoadContextArgs) {
  return args.context
}

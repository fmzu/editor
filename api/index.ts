import { WorkerEntrypoint } from "cloudflare:workers"
import type { Env } from "~/worker-configuration"
import { app } from "~/interface/api"

export default class extends WorkerEntrypoint<Env> {
  async fetch(request: Request) {
    return app.fetch(request, this.env)
  }
}

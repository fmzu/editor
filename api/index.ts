import { WorkerEntrypoint } from "cloudflare:workers"
import { api } from "~/interface/api"
import type { Env } from "~/worker-configuration"

export type Api = typeof api

export default class extends WorkerEntrypoint<Env> {
  fetch(request: Request) {
    return api.fetch(request, this.env)
  }

  hello() {
    console.log("hello")
  }

  request(input: RequestInfo | URL, init?: RequestInit) {
    return api.request(input, init, this.env)
  }
}

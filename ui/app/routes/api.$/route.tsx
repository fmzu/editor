import type { ActionFunction, LoaderFunction } from "@remix-run/cloudflare"

export const action: ActionFunction = async (props) => {
  const blob = await props.request.blob()
  return props.context.cloudflare.env.API.fetch(props.request.url, {
    method: props.request.method,
    headers: props.request.headers,
    body: blob,
  })
}

export const loader: LoaderFunction = (props) => {
  return props.context.cloudflare.env.API.fetch(props.request.url, {
    method: props.request.method,
    headers: new Headers({
      cookie: props.request.headers.get("cookie") ?? "-",
    }),
  })
}

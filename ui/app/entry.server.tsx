import { isbot } from "isbot"
import { renderToReadableStream } from "react-dom/server"
import type { AppLoadContext, EntryContext } from "react-router"
import { ServerRouter } from "react-router"

export default async function handleRequest(
  request: Request,
  responseStatusCode: number,
  responseHeaders: Headers,
  context: EntryContext,
  loadContext: AppLoadContext,
) {
  let statusCode = responseStatusCode

  const body = await renderToReadableStream(
    <ServerRouter context={context} url={request.url} />,
    {
      signal: request.signal,
      onError(error: unknown) {
        // Log streaming rendering errors from inside the shell
        console.error(error)
        statusCode = 500
      },
    },
  )

  if (isbot(request.headers.get("user-agent") || "")) {
    await body.allReady
  }

  responseHeaders.set("Content-Type", "text/html")

  return new Response(body, {
    headers: responseHeaders,
    status: statusCode,
  })
}

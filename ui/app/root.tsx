import { Links, Meta, Outlet, Scripts, ScrollRestoration } from "react-router"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import type { LinksFunction } from "react-router"
import { Toaster } from "~/components/ui/sonner"
import { authConfigManager, SessionProvider } from "@hono/auth-js/react"

import stylesheet from "~/root.css?url"

export const links: LinksFunction = () => [
  { rel: "stylesheet", href: stylesheet },
]

authConfigManager.setConfig({
  baseUrl: import.meta.env.VITE_API_URL,
  basePath: "/auth",
  credentials: "include",
})

type Props = { children: React.ReactNode }

export function Layout(props: Props) {
  return (
    <html lang="ja">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body>
        <SessionProvider>{props.children}</SessionProvider>
        <ScrollRestoration />
        <Scripts />
        <Toaster />
      </body>
    </html>
  )
}

const queryClient = new QueryClient()

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Outlet />
    </QueryClientProvider>
  )
}

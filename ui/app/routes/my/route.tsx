import { Outlet } from "react-router"
import { useSession } from "@hono/auth-js/react"

export default function Component() {
  const session = useSession()

  if (session.status === "loading") {
    return null
  }

  if (session.status === "unauthenticated") {
    return null
  }

  return <Outlet />
}

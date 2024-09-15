import { useSession } from "@hono/auth-js/react"
import { Link } from "@remix-run/react"
import { Button } from "~/components/ui/button"
import { AvatarPopover } from "~/routes/_main/components/avatar-popover"

export function MainHeader() {
  const session = useSession()

  return (
    <header className="flex justify-between items-center p-4 bg-gray-100">
      <Link to={"/"}>
        <div className="text-xl font-bold">{"HASCII"}</div>
      </Link>
      {session.status === "unauthenticated" ? (
        <div className="flex gap-x-2">
          <Link to={"/sign/up"}>
            <Button>{"新規登録"}</Button>
          </Link>
          <Link to={"/sign/in"}>
            <Button>{"ログイン"}</Button>
          </Link>
        </div>
      ) : (
        <div className="flex gap-x-2">
          <Link to={"/new"}>
            <Button>{"作成"}</Button>
          </Link>
          <AvatarPopover />
        </div>
      )}
    </header>
  )
}

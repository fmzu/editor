import { Link } from "@remix-run/react"
import { Button } from "~/components/ui/button"

export function MainHeader() {
  return (
    <header className="flex justify-between items-center p-4 bg-gray-100">
      <h1 className="text-xl font-bold">{"Header"}</h1>
      <div className="flex gap-x-2">
        <Link to={"/sign/up"}>
          <Button>{"sign-up"}</Button>
        </Link>
        <Link to={"/sign/in"}>
          <Button>{"sign-in"}</Button>
        </Link>
      </div>
    </header>
  )
}

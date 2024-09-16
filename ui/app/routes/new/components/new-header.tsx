import { Link } from "@remix-run/react"
import { Button } from "~/components/ui/button"
import { AvatarPopover } from "~/routes/_main/components/avatar-popover"

type Props = {
  onSubmit: () => void
}

export function NewHeader(props: Props) {
  return (
    <header className="flex justify-between items-center container p-8">
      <Link to={"/"}>
        <div className="text-xl font-bold">{"HASCII"}</div>
      </Link>
      <div className="flex gap-x-2">
        <Link to={"/new"}>
          <Button onClick={props.onSubmit}>{"投稿"}</Button>
        </Link>
        <AvatarPopover />
      </div>
    </header>
  )
}

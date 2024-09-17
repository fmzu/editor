import { Link } from "@remix-run/react"
import { AvatarPopover } from "~/routes/_main/components/avatar-popover"
import { PostDialog } from "~/routes/new/components/post-dialog"

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
          <PostDialog onSubmit={props.onSubmit} />
        </Link>
        <AvatarPopover />
      </div>
    </header>
  )
}

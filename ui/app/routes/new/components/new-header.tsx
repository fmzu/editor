import { Link } from "react-router"
import { AvatarPopover } from "~/routes/_main/components/avatar-popover"
import { PostDialog } from "~/routes/new/components/post-dialog"

type Props = {
  onSubmit: () => void
  dots: string
  title: string
  setTitle: (title: string) => void
  description: string
  setDescription: (description: string) => void
}

export function NewHeader(props: Props) {
  return (
    <header className="flex justify-between items-center container p-8">
      <Link to={"/"}>
        <div className="text-xl font-bold">{"HASCII"}</div>
      </Link>
      <div className="flex gap-x-2">
        <PostDialog
          onSubmit={props.onSubmit}
          dots={props.dots}
          title={props.title}
          setTitle={props.setTitle}
          description={props.description}
          setDescription={props.setDescription}
        />
        <AvatarPopover />
      </div>
    </header>
  )
}

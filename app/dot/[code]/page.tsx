import { DotWorkspace } from "@/app/dot/[code]/_components/dot-workspace"

type Props = {
  params: {
    code: string
  }
}

export default function DotCodePage(props: Props) {
  return (
    <main>
      <DotWorkspace code={props.params.code} />
    </main>
  )
}

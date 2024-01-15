import { DotWorkspace } from "@/app/dot/_components/dot-workspace"

type Props = {
  params: {
    code: string
  }
}

export default function Home(props: Props) {
  return (
    <main>
      <DotWorkspace code={props.params.code} />
    </main>
  )
}

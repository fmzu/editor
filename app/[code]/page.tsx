import { DotEditor } from "@/app/_components/dot-editor"

type Props = {
  params: {
    code: string
  }
}

export default function Home(props: Props) {
  return (
    <main>
      <DotEditor code={props.params.code} />
    </main>
  )
}

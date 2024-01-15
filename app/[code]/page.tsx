import { NesWorkspace } from "@/app/nes/[code]/_components/nes-workspace"

type Props = {
  params: {
    code: string
  }
}

export default function Home(props: Props) {
  return (
    <main>
      <NesWorkspace code={props.params.code} />
    </main>
  )
}

import { Link } from "@remix-run/react"
import { useMutation } from "@tanstack/react-query"
import { useState } from "react"
import { Button } from "~/components/ui/button"
import { Input } from "~/components/ui/input"
import { client } from "~/lib/client"

export default function LoginPage() {
  const [loginId, setLoginId] = useState("")

  const [loginPassword, setLoginPassword] = useState("")

  const mutation = useMutation({
    async mutationFn() {
      const resp = await client.api.users.$post({
        json: {
          email: loginId,
          password: loginPassword,
        },
      })
      const json = await resp.json()
      return json
    },
  })

  const onSubmit = () => {
    mutation.mutate()
  }

  return (
    <div className="p-4 space-y-4">
      <form
        onSubmit={(event) => {
          event.preventDefault()
          onSubmit()
        }}
        className="space-y-4"
      >
        <Input
          type="email"
          name={"body"}
          placeholder="ログインID"
          value={loginId}
          onChange={(event) => {
            setLoginId(event.target.value)
          }}
        />
        <Input
          type="password"
          name={"body"}
          placeholder="パスワード"
          value={loginPassword}
          onChange={(event) => {
            setLoginPassword(event.target.value)
          }}
        />
        <Button type={"submit"}>{"追加"}</Button>
      </form>
      <Link to={"/sign/in"}>
        <Button>{"sign-in"}</Button>
      </Link>
      <Link to={"/"}>
        <Button>{"home"}</Button>
      </Link>
    </div>
  )
}

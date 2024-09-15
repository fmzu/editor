import { Link, useNavigate } from "@remix-run/react"
import { useState } from "react"
import { Button } from "~/components/ui/button"
import { Input } from "~/components/ui/input"
import { useMutation } from "@tanstack/react-query"
import { toast } from "sonner"
import { signIn } from "@hono/auth-js/react"

export default function Route() {
  const navigate = useNavigate()

  const [loginId, setLoginId] = useState("")

  const [loginPassword, setLoginPassword] = useState("")

  const mutation = useMutation({
    async mutationFn() {
      const resp = await signIn("credentials", {
        email: loginId,
        password: loginPassword,
        redirect: false,
      })
      if (resp?.status !== 200) {
        return "ログインに失敗しました"
      }
      return null
    },
  })

  const onSubmit = async () => {
    const result = await mutation.mutateAsync()
    if (result === null) {
      navigate("/")
      return
    }
    toast(result)
  }

  return (
    <div className="flex flex-col p-4 gap-y-4">
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
      <div className="flex gap-x-2">
        <Link to={"/sign/up"}>
          <Button>{"sign-up"}</Button>
        </Link>
        <Link to={"/sign/in"}>
          <Button>{"sign-in"}</Button>
        </Link>
        <Link to={"/"}>
          <Button>{"home"}</Button>
        </Link>
      </div>
    </div>
  )
}

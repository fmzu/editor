import { Outlet } from "@remix-run/react"
import { MainHeader } from "~/routes/_main/components/main-header"

export default function MainLayout() {
  return (
    <>
      <MainHeader />
      <Outlet />
    </>
  )
}

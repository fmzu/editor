import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
} from "~/components/ui/sidebar"
import { HomeIcon, LockKeyholeIcon, LockKeyholeOpenIcon } from "lucide-react"
import { Link, Outlet } from "react-router"
import { Suspense } from "react"
import { useSuspenseQuery } from "@tanstack/react-query"
import { client } from "~/lib/client"

const endpoint = client.my.posts

export default function Component() {
  const myPostsQuery = useSuspenseQuery({
    queryKey: [endpoint.$url({})],
    async queryFn() {
      const resp = await endpoint.$get({})
      return resp.json()
    },
  })

  return (
    <SidebarProvider>
      <Sidebar>
        <SidebarContent>
          <SidebarGroup>
            <SidebarMenu>
              <SidebarMenuItem>
                <Link to="/">
                  <SidebarMenuButton asChild>
                    <span className="flex">
                      <HomeIcon />
                      <span>{"ホーム"}</span>
                    </span>
                  </SidebarMenuButton>
                </Link>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroup>
          <SidebarGroup>
            <SidebarGroupLabel>{"作品"}</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {myPostsQuery.data.map((post) => (
                  <SidebarMenuItem key={post.id}>
                    <Link to={`/my/posts/${post.id}`}>
                      <SidebarMenuButton asChild>
                        <span className="flex">
                          {post.isPublic ? (
                            <LockKeyholeOpenIcon />
                          ) : (
                            <LockKeyholeIcon />
                          )}
                          {post.title}
                        </span>
                      </SidebarMenuButton>
                    </Link>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>
      </Sidebar>
      <Suspense fallback={null}>
        <Outlet />
      </Suspense>
    </SidebarProvider>
  )
}

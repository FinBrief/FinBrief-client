"use client";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarGroupLabel,
  SidebarGroupAction,
  SidebarGroupContent,
  useSidebar
} from "@/components/ui/sidebar";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useUser } from "@clerk/nextjs";

const feedItems = [
  { name: "All posts", href: "/feed/all" },
  { name: "Custom feed", href: "/feed/custom" },
  { name: "Bookmarks", href: "/feed/bookmarks" },
]

export function AppSidebar() {
  const pathname = usePathname();   
  const { isLoaded, isSignedIn, user } = useUser();
  const {
    setOpenMobile
  } = useSidebar()

  if (!isLoaded || !isSignedIn) {
    return null;
  }

  return (
    <Sidebar collapsible="offcanvas">
      <SidebarHeader>
        <div className="flex items-center justify-between w-full py-2 ml-2">
          <Link href="/">
            <div className="font-bold text-3xl">FinBrief.</div>
          </Link>
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Feed</SidebarGroupLabel>
          <SidebarGroupAction>
            <span className="sr-only">Change feed</span>
          </SidebarGroupAction>
          <SidebarGroupContent>
            <SidebarMenu>
            {feedItems.map((item) => (
              <SidebarMenuItem key={item.name}>
                <SidebarMenuButton 
                  asChild 
                  isActive={pathname === item.href}
                  onClick={() => setOpenMobile(false)}
                >
                  <Link prefetch={false} href={item.href}>
                    <span>{item.name}</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
          <SidebarMenu>
            <SidebarMenuItem>
              <div className="flex items-center gap-2 p-2">
                <div className="rounded-full w-9 h-9 flex items-center justify-center bg-gray-600 text-white">
                  {user.username?.[0].toUpperCase() || "U"}
                </div>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-semibold">
                    {user.username || "User"}
                  </span>
                  <span className="truncate text-xs">
                    {user.emailAddresses[0].emailAddress || "email@example.com"}
                  </span>
                </div>
              </div>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarFooter>
    </Sidebar>
  )
}

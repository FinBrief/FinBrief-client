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
  SidebarRail
} from "@/components/ui/sidebar"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
  } from "@/components/ui/dropdown-menu"
import { ChevronsUpDown } from "lucide-react"
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useAuth } from "@/hooks/useAuth";
import { signOut } from "@/actions/userAuth";
import { toast } from "sonner";

const feedItems = [
  { name: "All posts", href: "/feed/all" },
  { name: "Custom feed", href: "/feed/custom" },
  { name: "Bookmarks", href: "/feed/bookmarks" },
]

export function AppSidebar() {
  const pathname = usePathname();   
  const { userData } = useAuth();   
  const router = useRouter();

  const user = {
    data: {
      username: userData?.username,
      email: userData?.email
    }
  }

  const handleSignOut = async () => {
    toast.loading("Signing out...");
    const success = await signOut();
    toast.dismiss();
    if (!success) {
      toast.error("Error signing out");
    } else {
      router.push('/');
      toast.success("Signed out");
    }
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
                <SidebarMenuButton asChild isActive={pathname === item.href}>
                  <Link href={item.href}>
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
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <SidebarMenuButton
                    size="lg"
                    className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
                  >
                    <div className="rounded-full w-9 h-9 flex items-center justify-center bg-gray-600 text-white">
                      {userData?.username[0].toUpperCase()}
                    </div>
                    <div className="grid flex-1 text-left text-sm leading-tight">
                      <span className="truncate font-semibold">
                        {userData?.username || "User"}
                      </span>
                      <span className="truncate text-xs">
                        {userData?.email || "email@example.com"}
                      </span>
                    </div>
                    <ChevronsUpDown className="ml-auto size-4" />
                  </SidebarMenuButton>
                </DropdownMenuTrigger>
                <DropdownMenuContent
                  className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg"
                  side="bottom"
                  align="end"
                  sideOffset={4}
                >
                  <DropdownMenuLabel className="p-0 font-normal">
                    <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">                    
                      <div className="grid flex-1 text-left text-sm leading-tight gap-1">
                        <span className="truncate font-semibold">
                          {user.data?.username || "User"}
                        </span>
                        <span className="truncate text-xs">
                          {user.data?.email || "email@example.com"}
                        </span>
                      </div>
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuGroup>
                    <DropdownMenuItem>
                      Account
                    </DropdownMenuItem>
                  </DropdownMenuGroup>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={() => handleSignOut()}>
                    Sign out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarFooter>
    </Sidebar>
  )
}

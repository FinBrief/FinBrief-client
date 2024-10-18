import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { signOut } from "@/actions/userAuth";
import Link from "next/link";

export function ProfileDropdown() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <div className="flex justify-center items-center h-9 w-9 overflow-hidden rounded-lg dark:bg-gray-700 bg-gray-600 text-white dark:hover:bg-gray-800 hover:bg-gray-700 cursor-pointer">
          NG
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuLabel>Username</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          <Link href="/profile">
            Profile settings
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem>
          Tags
        </DropdownMenuItem>
        <DropdownMenuItem>
          Bookmarks
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={() => signOut()}>
          Sign out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

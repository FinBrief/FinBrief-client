import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Dialog,
  DialogTrigger
} from "@/components/ui/dialog"
import { ChangeEmailDialog, ChangePassDialog } from "./changeCredentials";
import { signOut } from "@/actions/userAuth";

export function ProfileDropdown() {
  return (
    <Dialog>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <div className="flex justify-center items-center h-9 w-9 overflow-hidden rounded-full bg-gray-700 text-white hover:bg-gray-800 cursor-pointer">
            NG
          </div>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56">
          <DropdownMenuLabel>Username</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DialogTrigger asChild>
            <DropdownMenuItem>
              Change email
            </DropdownMenuItem>
          </DialogTrigger>
          <DialogTrigger asChild>
            <DropdownMenuItem>
              Change Password
            </DropdownMenuItem>
          </DialogTrigger>
          <DropdownMenuSeparator />
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
      <ChangePassDialog />
    </Dialog>
  )
}

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"

export function ProfileSheet() {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline">Profile</Button>
      </SheetTrigger>
      <SheetContent >
        <SheetHeader>
          <SheetTitle>Your profile</SheetTitle>
          <SheetDescription>
            View or make changes to your profile here.
          </SheetDescription>
        </SheetHeader>
        <div className="grid gap-4 py-10">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="username" className="text-left">
              Username
            </Label>
            <Input id="username" value="" className="col-span-3" />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="email" className="text-left">
              Email
            </Label>
            <Input id="email" value="" className="col-span-3" />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="password" className="text-left">
              Password
            </Label>
            <Input id="password" value="" className="col-span-3" />
          </div>
        </div>
        <SheetFooter>
          <SheetClose asChild>
            <Button type="submit">Save changes</Button>
          </SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  )
}

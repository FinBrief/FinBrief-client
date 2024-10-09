import { Button } from "@/components/ui/button"
import {
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export function ChangePassDialog() {
  return (
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Change password</DialogTitle>
          <DialogDescription>
            Enter your current password and your new password and click save.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="space-y-1">
            <Label htmlFor="current">Current password</Label>
            <Input id="current" type="password" name="currentPass" />
          </div>
          <div className="space-y-1">
            <Label htmlFor="new">New password</Label> 
            <Input id="new" type="password" name="newPass" />
          </div>
        </div>
        <DialogFooter>
          <Button type="submit">Save changes</Button>
        </DialogFooter>
      </DialogContent>
  )
}

export function ChangeEmailDialog() {
  return (
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Change password</DialogTitle>
          <DialogDescription>
            Enter your current password and your new password and click save.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="space-y-1">
            <Label htmlFor="current">Current password</Label>
            <Input id="current" type="password" name="currentPass" />
          </div>
          <div className="space-y-1">
            <Label htmlFor="new">New password</Label> 
            <Input id="new" type="password" name="newPass" />
          </div>
        </div>
        <DialogFooter>
          <Button type="submit">Save changes</Button>
        </DialogFooter>
      </DialogContent>
  )
}

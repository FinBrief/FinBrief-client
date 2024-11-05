import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import SignOutButton from "../auth/signOutButton"

export default function ProfileSettings({ email, username }: { email: string, username: string }) {
  return (
    <div className="flex flex-col w-full max-w-3xl gap-4">
      <div className="flex justify-between items-center mb-6">
        <div className="flex flex-col font-bold gap-2">
          <div className="text-2xl">
            Hello, {username}
          </div>
          <div className="text-xl text-muted-foreground">
            {email}
          </div>   
        </div>
        <SignOutButton />
      </div>
      <Card className="w-full max-w-3xl">
        <CardHeader>
          <CardTitle>Change Username</CardTitle>
          <CardDescription>
            Enter your new username.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form>
            <Input placeholder="New Username" />
          </form>
        </CardContent>
        <CardFooter className="border-t px-6 py-4">
          <Button variant="secondary">Save</Button>
        </CardFooter>
      </Card>
      <Card className="w-full max-w-3xl">
        <CardHeader>
          <CardTitle>Change Email</CardTitle>
          <CardDescription>
            Enter your new email.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form className="flex flex-col gap-4">
            <Input
              placeholder="New Email"
            />
          </form>
        </CardContent>
        <CardFooter className="border-t px-6 py-4">
          <Button variant="secondary">Save</Button>
        </CardFooter>
      </Card>
      <Card className="w-full max-w-3xl">
        <CardHeader>
          <CardTitle>Change Password</CardTitle>
          <CardDescription>
            Enter your new password.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form className="flex flex-col gap-4">
            <Input
              placeholder="Current Password"
            />
            <Input
              placeholder="New Password"
            />
          </form>
        </CardContent>
        <CardFooter className="border-t px-6 py-4">
          <Button variant="secondary">Save</Button>
        </CardFooter>
      </Card>
    </div>
  )
}
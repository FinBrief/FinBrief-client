'use client'

import Link from "next/link"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { signInWithGoogle, signup } from "@/actions/userAuth"

export default function LoginForm() {
  return (
    <Card className="mx-auto w-full max-w-[380px]">
      <CardHeader>
        <CardTitle className="text-xl">Sign up to FinBrief</CardTitle>
        <CardDescription>
          Enter your information to create an account
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid gap-4">
          <form action={signup} className="grid gap-2">
            <div className="grid gap-2">
              <Label htmlFor="username">Username</Label>
              <Input id="username" name="username" required />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                name="email"
                type="email"
                required
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="password">
                <div className="flex gap-2">

                <div>
                Password
                </div>

                <div className=" text-slate-400">

                (minimum 8 chracters)
                </div>
                </div>
                </Label>
              <Input id="password" name="password" type="password" />
            </div>
            <Button type="submit" className="w-full">
              Create an account
            </Button>
          </form>
          <div className="w-full text-center text-sm">
            Or
          </div>
          <Button variant="outline" className="w-full" onClick={() => signInWithGoogle()}>
            Sign up with Google
          </Button>
        </div>
        <div className="mt-4 text-center text-sm">
          Already have an account?{" "}
          <Link href="/login" className="underline">
            Log in
          </Link>
        </div>
      </CardContent>
    </Card>
  )
}

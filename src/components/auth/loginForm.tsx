'use client'

import { useState } from "react"
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
import { login, signInWithGoogle } from "@/actions/userAuth"
import { toast } from "sonner"
import { useRouter } from "next/navigation"

export default function LoginForm() {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  async function handleLogin(formData: FormData) {
    setIsLoading(true);
    const res = await login(formData);
    if (res.error) {
      toast.error(res.error);
    }
    setIsLoading(false);
    router.push('/feed/custom');
  }

  return (
    <>
      <div className="absolute top-8 left-10">
        <Link prefetch={false} href="/">
          <Button variant="outline" size="lg"> Back to Home </Button>
        </Link>
      </div>
      <Card className="mx-auto w-full max-w-[380px]">
        <CardHeader>
          <CardTitle className="text-xl">Login to FinBrief</CardTitle>
          <CardDescription>
            Welcome back! Please login to continue
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4">
            <form action={handleLogin} className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                name="email"
                type="email"
                required
              />
              <Label htmlFor="password" >Password</Label>
              <Input id="password" name="password" type="password" />
              <Button className="w-full" disabled={isLoading}>
                {isLoading ? 'Logging in...' : 'Login'}
              </Button>
            </form>
            <div className="w-full text-center text-sm">
              Or
            </div>
            <Button
              variant="outline"
              className="w-full"
              onClick={() => signInWithGoogle()}
              disabled={true}
            >
              Continue with Google
            </Button>
          </div>
          <div className="mt-4 text-center text-sm">
            Don&apos;t have an account?{" "}
            <Link href="/signup" className="underline">
              Sign up
            </Link>
          </div>
        </CardContent>
      </Card>
    </>
  )
}

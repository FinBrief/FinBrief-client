"use client";

import Link from "next/link";
import { signOut } from "@/actions/userAuth";
import { Button } from "@/components/ui/button";


export default function LandingPage() {
  return (
    <div className="flex flex-col items-center justify-center h-screen gap-4">
      <h1>FinBrief</h1>
      <Link href="/login">Login</Link>
      <Link href="/signup">Signup</Link>
      <Button onClick={() => signOut()}>SignOut</Button>
      <Link href="/feed">Feed</Link>
    </div>
  );
}


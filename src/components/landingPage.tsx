"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { signOut } from "@/actions/userAuth";
import { Button } from "@/components/ui/button";
import Footer from "@/components/footer";

export default function LandingPage() {
  return (
    <>
    <nav className="flex absolute top-0 left-0 right-0 justify-between items-center p-6 mx-24">
      <h1 className="text-3xl font-bold">
        FinBrief.
      </h1>
      <div className="flex gap-6 justify-center items-center">
        <Link href="/login"><Button variant="outline" size="lg">Log in</Button></Link>
        <Link href="/signup"><Button size="lg">Sign up</Button></Link>
        {/*<Button onClick={() => signOut()}>SignOut</Button>*/}
      </div>
    </nav>
    <main className="flex flex-col items-center justify-center h-screen mx-24">
      <Link href="/feed">Feed</Link>
    </main>
    <Footer />
    </>
  );
}


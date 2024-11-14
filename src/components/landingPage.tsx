"use client";

import { IBM_Plex_Serif } from "next/font/google";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import Footer from "@/components/footer";
import { ModeToggle } from "./theme/mode-toggle";
import { StickyScroll } from "./stickyScroll";
import { TypewriterEffectSmooth } from "./ui/typewriter";
import { StarsBackground } from "./ui/stars";
import {
  SignedIn,
  SignedOut,
  SignOutButton as ClerkSignOutButton
} from '@clerk/nextjs'

const ibmSerif = IBM_Plex_Serif({
  subsets: ['latin'],
  weight: ['400']
});

const words = [
  {
    text: "Personalized Financial News,",
    className: `text-muted-foreground dark:text-muted-foreground ${ibmSerif.className}`,
  },
  {
    text: "Simplified Summaries",
    className: `text-blue-500 dark:text-blue-450 ${ibmSerif.className} font-bold`,
  }
];

export default function LandingPage() {
  return (
    <>
      <div className="fixed top-0 left-0 w-full min-h-screen z-0">
        <StarsBackground />
      </div>
      <header className="absolute top-5 right-5 flex items-center gap-4">
        <SignedOut>
          <div className="flex items-center gap-2">
            <Link prefetch={false} href="/login">
              <Button variant="secondary"> Log in </Button> 
            </Link>
            <Link prefetch={false} href="/signup">
              <Button> Sign up </Button>
            </Link>
          </div>
        </SignedOut>
        <SignedIn>
          <div className="flex items-center gap-2">
            <Link href="/feed/all">
              <Button variant="ghost" className="text-md underline"> Go to your feed </Button>
            </Link>
            <ClerkSignOutButton>
              <Button> Sign out </Button>
            </ClerkSignOutButton>
          </div>
        </SignedIn>
        <ModeToggle />
      </header>
      <div className="flex flex-col justify-center items-center">
        <section className="flex flex-col h-[calc(100vh-300px)] w-full items-center justify-center space-y-10">
          <h1 className={`text-5xl md:text-6xl font-bold ${ibmSerif.className}`}>
            FinBrief.
          </h1>
          <div className="hidden min-[600px]:block">
            <TypewriterEffectSmooth words={words} />
          </div>
          <div className="block min-[600px]:hidden text-center p-2">
            <h2 className="text-xl font-bold">
              Personalized Financial News, <span className="text-blue-500">Simplified summaries</span>
            </h2>
          </div>
        </section>   
        <StickyScroll />
        <div className="max-w-7xl mx-auto py-20 px-4 md:px-8 lg:px-10">
          <p className={`text-neutral-800 dark:text-neutral-300 text-sm md:text-xl max-w-2xl leading-relaxed text-center ${ibmSerif.className}`}>
            Stay ahead in the financial world with personalized news delivery, AI-powered summaries, 
            and a clutter-free reading experience designed for you.
          </p>
        </div>
        <div className="z-10">
          <Link href="/feed/all">
            <button className="p-[3px] relative">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg" />
              <div className="px-8 py-2 bg-background rounded-[6px] relative group transition duration-200 text-white hover:bg-transparent">
                Get started!
              </div>
            </button>
          </Link>
        </div>
        <Footer />
      </div>
    </>
  ); 
}



 /*
  <div className="flex gap-6 justify-center items-center">
       
      </div>
  <Link href="/login"><Button variant="outline" size="lg">Log in</Button></Link>
  <Link href="/signup"><Button size="lg">Sign up</Button></Link>
  <Button onClick={() => signOut()}>SignOut</Button>

   <h2 className="text-2xl font-bold">Save posts</h2>
            <p className="text-xl">get quick summaries</p>
            <p className="text-xl">view the lastest news from your favorite sources at one place</p>
            <p className="text-xl">follow specific topics</p>
  */

/* 
{loggedIn ? (
          <div className="flex items-center gap-2">
            <Link prefetch={false} href="/feed/custom">
              <Button variant="ghost" className="text-md underline"> Go to your feed </Button>
            </Link>
            <SignOutButton />
          </div>
        ) : (
          <div className="flex items-center gap-2">
            <Link prefetch={false} href="/login">
              <Button variant="secondary"> Log in </Button> 
            </Link>
            <Link prefetch={false} href="/signup">
              <Button> Sign up </Button>
            </Link>
          </div>
        )}

*/
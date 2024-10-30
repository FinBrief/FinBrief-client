"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { signOut } from "@/actions/userAuth";
import { Button } from "@/components/ui/button";
import Footer from "@/components/footer";
import { ModeToggle } from "./theme/mode-toggle";
import { SparklesCore } from "@/components/ui/sparkles";
import { StickyScroll } from "./stickyScroll";
import { TypewriterEffectSmooth } from "./ui/typewriter";

const words = [
  {
    text: "Personalized Financial News,",
    className: "text-muted-foreground dark:text-muted-foreground",
  },
  {
    text: "Simplified Summaries",
    className: "text-blue-500 dark:text-blue-450",
  }
];

export default function LandingPage() {
  return (
    <>
      <header className="absolute top-5 right-5 flex items-center gap-2">
        <Link href="/signup">
          <Button> Sign up </Button>
        </Link>
        <Link href="/login">
          <Button variant="outline"> Log in </Button> 
        </Link>
        <ModeToggle />
      </header>
      <div className="flex flex-col justify-center items-center">
        <section className="flex flex-col h-[calc(100vh-220px)] items-center justify-center space-y-10">
          <h1 className="text-5xl md:text-6xl font-bold">
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
        <Link href="/feed">
          <Button size="lg" variant="ghost" className="text-xl mt-10">Get started</Button>
        </Link>
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

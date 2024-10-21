"use client";

import Link from "next/link";
import Posts from "./posts";
import { ModeToggle } from "@/components/theme/mode-toggle"
import { ProfileDropdown } from "./profileDropdown";
import { InfoSheet } from "./leftPopout";
import { Button } from "@/components/ui/button"
import { SettingsIcon } from "lucide-react";

export default function UserFeed() {
  return (
    <>
      <header className="fixed top-0 bottom-[calc(100vh-theme(spacing.16))] flex w-full items-center justify-between px-4 p-2 bg-background border-b">
        <InfoSheet />
        <Link href="/">
          <div className="font-bold text-3xl">FinBrief.</div>
        </Link>
        <div className="flex items-center bg-gray-200 dark:bg-black space-x-4 p-1 rounded-lg">
          <ProfileDropdown />
          <ModeToggle />
        </div>
      </header>
      <div className="flex min-h-screen w-full">
        <aside className="sticky top-16 h-[calc(100vh-theme(spacing.16))] overflow-y-auto hidden md:block w-55 lg:w-64 p-4 pt-6 border-r">
          <div className="flex flex-col h-full">
            <div className="mb-4">
              <Button variant="default" aria-label="Edit Feed" className="px-2 font-bold text-lg "> 
                Edit feed 
                <SettingsIcon className="ml-2 w-5 h-5" /> 
              </Button>
            </div>
            <nav>
              <ul className="flex flex-col gap-2">
                <li>Custom feed</li>
                <li>All posts</li>
                <li>Tags</li>
                <li>Sources</li>
                <li>Bookmarks</li>
              </ul>
            </nav>
            <div className="flex-1"></div>
            <nav className="flex flex-col gap-2 mb-2">
              <div>Submit a source</div>
              <div>Feedback</div>
            </nav>
          </div>
        </aside>
        <main className="flex-1 p-4 overflow-y-auto px-4 mt-16">
          <div className="pb-6 md:hidden">
            <Button variant="secondary">Edit feed</Button>
          </div>
          <Posts />     
        </main>
      </div>
    </>
  );
}

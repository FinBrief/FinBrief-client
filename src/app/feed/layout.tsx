"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ModeToggle } from "@/components/theme/mode-toggle"
import { ProfileDropdown } from "@/components/feed/profileDropdown";
import { InfoSheet } from "@/components/feed/leftPopout";
import { Button } from "@/components/ui/button"
import ChatBot from "@/components/chatBot";

export default function FeedLayout({
  children, 
}: {
  children: React.ReactNode
}) {
  const pathname = usePathname();
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
            <nav>
              <ul className="flex flex-col gap-2">
                <li className={`hover:underline ${pathname === "/feed/all" ? "font-bold" : ""}`}><Link href="/feed/all">All posts</Link></li>
                <li className={`hover:underline ${pathname === "/feed/custom" ? "font-bold" : ""}`}><Link href="/feed/custom">Custom feed</Link></li>
                <li className="hover:underline">Tags</li>
                <li className="hover:underline">Sources</li>
                <li className="hover:underline"><Link href="/profile">Bookmarks</Link></li>
              </ul>
            </nav>
            <div className="flex-1"></div>
            <nav className="flex flex-col gap-2 mb-2">
              <div>Submit a source</div>
              <div>Feedback</div>
            </nav>
          </div>
        </aside>
        <main className="flex-1 p-4 overflow-y-auto px-4 mt-16 md:mx-8">
          {children}
        </main>
        <ChatBot/>
      </div>
    </>
  )
}
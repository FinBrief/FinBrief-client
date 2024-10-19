"use client";

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import Link from "next/link";
import Posts from "./posts";
import { ModeToggle } from "@/components/theme/mode-toggle"
import { ProfileDropdown } from "./profileDropdown";
import { InfoSheet } from "./leftPopout";
import { Button } from "@/components/ui/button"
import { SettingsIcon } from "lucide-react";


export default function UserFeed() {

  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <div className="flex flex-col min-h-screen w-full">
        <nav className="sticky top-0 flex w-full items-center justify-between px-4 p-2 border-b">
          <InfoSheet />
          <Link href="/">
            <div className="font-bold text-3xl">FinBrief.</div>
          </Link>
          <div className="flex items-center md:gap-2 bg-gray-200 dark:bg-black space-x-4 p-1 rounded-lg">
            <ProfileDropdown />
            <ModeToggle />
          </div>
        </nav>
        <div className="flex bg-background text-foreground h-full w-full">
          <aside className="hidden md:block w-55 lg:w-64 p-4 pt-6 border-r">
            <div className="space-y-4">
              <div className="flex items-start">
                <Button variant="ghost">
                  <div className="text-xl font-bold mr-2">
                    Edit feed
                  </div>
                  <SettingsIcon />
                </Button>
              </div>
              <div className="space-y-2">
                <div>Custom feed</div>
                <div className="font-bold">Discover</div>
                <div>Explore</div>
                <div>Discussions</div>
                <div>Tags</div>
                <div>Sources</div>
                <div>Submit a link</div>
                <div>Bookmarks</div>
              </div>
            </div>
          </aside>
          <main className="flex-1 p-4 px-4 mt-2">
            <div className="pb-6 md:hidden">
              <Button variant="secondary">Edit feed</Button>
            </div>
            <Posts />          
          </main>
        </div>
      </div>
    </QueryClientProvider>
  );
}

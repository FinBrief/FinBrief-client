"use client";

import { ModeToggle } from "@/components/theme/mode-toggle"
import ChatBot from "@/components/chatBot";
import { SidebarInset, SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/feed/app-sidebar";
import { EditFeedDialog } from "@/components/feed/editFeedDialog";
import { usePathname } from "next/navigation";

export default async function FeedLayout({children}: {children: React.ReactNode}) {
  const pathname = usePathname();

  return (
    <SidebarProvider>
      <AppSidebar/>
      <SidebarInset>
        <header className="flex justify-between sticky bg-background top-0 h-16 shrink-0 items-center gap-2 border-b px-4">   
          <div className="flex items-center gap-3">
            <SidebarTrigger/> 
            {pathname === "/feed/bookmarks" ? (             
              <div className="flex items-center">
                Bookmarks
              </div>
            ) : pathname === "/feed/all" ? (
              <div className="flex items-center">
                All posts
              </div>
            ) : (
              <div className="flex items-center">
                <EditFeedDialog />
              </div>
            )}
          </div>
          <ModeToggle/>
        </header>
        <main className="flex items-center justify-center overflow-y-auto px-4 md:px-6 pt-6 bg-background min-h-screen">
          {children}
        </main>
      </SidebarInset>
      <ChatBot/>
    </SidebarProvider> 
  )
}

/*
<header className="fixed top-0 bottom-[calc(100vh-theme(spacing.16))] flex w-full items-center justify-between px-4 p-2 bg-background border-b">
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
      <div className="flex flex-col gap-2 mr-2">
        
          <Button variant="ghost" className={`justify-start w-full ${pathname === "/feed/all" ? "font-bold bg-gray-100 dark:bg-zinc-800" : ""}`}>
          <Link href="/feed/all">
            All posts
          </Link>
        </Button>
        <Link href="/feed/custom">
          <Button variant="ghost" className={`justify-start w-full ${pathname === "/feed/custom" ? "font-bold bg-gray-100 dark:bg-zinc-800" : ""}`}>
            Custom feed
          </Button>    
        </Link>
        <Link href="/profile">
          <Button variant="ghost" className="justify-start w-full">
            Bookmarks
          </Button>
        </Link>
      </div>
      </nav>
    <div className="flex-1"></div>
    <nav className="flex flex-col gap-2 mb-2 px-1">
      <div>Sources</div>
      <div>Submit a source</div>
      <div>Feedback</div>
    </nav>
  </div>
    </aside>
*/
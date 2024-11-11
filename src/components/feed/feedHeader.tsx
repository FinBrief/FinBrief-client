"use client";

import { SidebarTrigger } from "@/components/ui/sidebar";
import { EditFeedDialog } from "@/components/feed/editFeedDialog";
import { UserButton } from "@clerk/nextjs";
import { ModeToggle } from "@/components/theme/mode-toggle";
import { usePathname } from "next/navigation";

export default function FeedHeader() {
  const pathname = usePathname();
  
  return (
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
      <div className="flex items-center gap-4 bg-zinc-200/50 dark:bg-zinc-800/50 p-1 px-2 rounded-lg">
        <UserButton />  
        <ModeToggle/>
      </div>
    </header>
  )
}
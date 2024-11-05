"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Posts from "./posts";
import { ModeToggle } from "@/components/theme/mode-toggle"
import { ProfileDropdown } from "./profileDropdown";
import { InfoSheet } from "./leftPopout";
import { Button } from "@/components/ui/button"
import { EditFeedDialog } from "./editFeedDialog";
import { Post, Tag } from "@/lib/types";
import ChatBot from "../chatBot";
import { fetchUserBookmarks } from "@/actions/bookmark";
import { useBookmark } from "@/hooks/useBookmark";

const tags = [
  {id: "1", name: "Top News"},
  {id: "2", name: "World news"},
  {id: "3", name: "India news"},
  {id: "4", name: "Europe news"},
  {id: "5", name: "Asia news"},
  {id: "6", name: "Business"},
  {id: "7", name: "Earnings"},
  {id: "8", name: "Economy"},
  {id: "9", name: "Finance"},
  {id: "10", name: "Tech"},
  {id: "11", name: "Politics"},
  {id: "12", name: "Health care"},
  {id: "13", name: "Small business"},
  {id: "14", name: "Energy"},
  {id: "15", name: "Retail"},
  {id: "16", name: "Investing"},
  //add more
]

export default function UserFeed() {
  const [selectedTags, setSelectedTags] = useState<Tag[]>([]);
  const [bookmarks, setBookmarks] = useState<string[]>([]);

  const { data: bookmarkIds } = useBookmark();

  const onTagClick = (tag: Tag) => {
    setSelectedTags(prev => 
      prev.some(t => t.id === tag.id)
        ? prev.filter(t => t.id !== tag.id)   
        : [...prev, tag]
    );
  };

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
              <EditFeedDialog tags={tags} selectedTags={selectedTags} onTagClick={onTagClick} />
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
        <main className="flex-1 p-4 overflow-y-auto px-4 mt-16 md:mx-8">
          <div className="pb-6 md:hidden">
            <Button variant="secondary">Edit feed</Button>
          </div>
          <Posts bookmarkIds={bookmarkIds} />     
        </main>
        <ChatBot/>
       
      </div>
    </>
  );
}

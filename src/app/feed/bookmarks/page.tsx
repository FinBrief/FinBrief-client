"use client";

import { useBookmark } from "@/hooks/useBookmark";
import { BookmarksFeed } from "@/components/feed/bookmarksFeed";
import { Bookmark } from "lucide-react";

export default function BookmarksPage() {
  const { data: bookmarks } = useBookmark();

  if (bookmarks && bookmarks.length === 0) return (
    <div className="flex flex-col justify-center items-center h-full gap-4">
      <h1 className="text-xl font-semibold">No bookmarks found</h1>
      <div className="flex gap-2 text-center text-sm text-gray-400">
        Save posts here by clicking the <Bookmark className="h-4 w-4" /> button on any post.
      </div>
    </div>
  )

  return (
    <>
      <BookmarksFeed bookmarks={bookmarks || []} />     
    </>
  );
}

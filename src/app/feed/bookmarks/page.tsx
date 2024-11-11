"use client";

import { useBookmark } from "@/hooks/useBookmark";
import { BookmarksFeed } from "@/components/feed/bookmarksFeed";

export default function BookmarksPage() {
  const { data: bookmarks } = useBookmark();

  return (
    <>
      <BookmarksFeed bookmarks={bookmarks || []} />     
    </>
  );
}

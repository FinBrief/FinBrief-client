"use client";

import Posts from "@/components/feed/posts";
import { useBookmark } from "@/hooks/useBookmark";

export default function AllFeedPage() {
  const { data: bookmarks } = useBookmark();
  const bookmarkIds = bookmarks?.map(bookmark => bookmark.id);

  return (
    <>
      <Posts bookmarkIds={bookmarkIds} tags={undefined}/>     
    </>
  );
}


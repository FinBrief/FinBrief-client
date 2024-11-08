"use client";

import { useBookmark } from "@/hooks/useBookmark";
import Posts from "@/components/feed/posts";

export default function BookmarksPage() {
  const { data: bookmarkIds } = useBookmark();

  return (
    <>
      <Posts bookmarkIds={bookmarkIds} />     
    </>
  );
}

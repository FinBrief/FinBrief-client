"use client";

import Posts from "@/components/feed/posts";
import { useBookmark } from "@/hooks/useBookmark";

export default function AllFeedPage() {

  const { data: bookmarkIds } = useBookmark();

  return (
    <>
      <Posts bookmarkIds={bookmarkIds} />     
    </>
  );
}


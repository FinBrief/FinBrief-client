"use client";

import Posts from "@/components/feed/posts";
import { useBookmark } from "@/hooks/useBookmark";

export default function AllFeed() {

  const { data: bookmarkIds } = useBookmark();

  return (
    <>
      <Posts bookmarkIds={bookmarkIds} />     
    </>
  );
}

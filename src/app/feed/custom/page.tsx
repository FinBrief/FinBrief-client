"use client";

import Posts from "@/components/feed/posts";
import { EditFeedDialog } from "@/components/feed/editFeedDialog";
import { useBookmark } from "@/hooks/useBookmark";

export default function CustomFeedPage() {
  const { data: bookmarkIds } = useBookmark();

  return (
    <>
      <Posts bookmarkIds={bookmarkIds} />     
    </>
  );
}

"use client";

import Posts from "@/components/feed/posts";
import { useBookmark } from "@/hooks/useBookmark";
import { useTags } from "@/hooks/useTags";

export default function CustomFeedPage() {
  const { data: bookmarks } = useBookmark();
  const { data: tags } = useTags();

  if (tags && tags.length === 0) {
    return (
      <div className="flex flex-col gap-2 items-center justify-center h-full">
        <p className="text-lg font-semibold">No topics selected</p>
        <p>Edit your feed to select topics and see those posts from those topics here.</p>
      </div>
    );
  }

  const bookmarkIds = bookmarks?.map(bookmark => bookmark.id);
  const tagIds = tags?.map(tag => tag.id);

  return (
    <>
      <Posts bookmarkIds={bookmarkIds} tags={tagIds} />     
    </>
  );
}

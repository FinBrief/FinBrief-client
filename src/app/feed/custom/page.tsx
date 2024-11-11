"use client";

import Posts from "@/components/feed/posts";
import { useBookmark } from "@/hooks/useBookmark";
import { useTags } from "@/hooks/useTags";

export default function CustomFeedPage() {
  const { data: bookmarks } = useBookmark();
  const { data: tags } = useTags();

  if (tags && tags.length === 0) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-lg font-semibold">No tags found</p>
        <p>Edit your feed to add tags and see those posts here.</p>
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

import { Post } from "@/lib/types";
import { PostCard } from "@/components/feed/postCard";
import { useHandleBookmark } from "@/hooks/useBookmark";

export function BookmarksFeed({ bookmarks }: { bookmarks: Post[] }) {
  const { handleSetBookmark, handleRemoveBookmark, isPending } = useHandleBookmark();

  return (
    <>
      <div className="flex flex-col gap-4 w-full md:mx-4 lg:mx-6 mt-2">
        {bookmarks.map((bookmark) => (
          <PostCard key={bookmark.id} post={bookmark} isBookmark={true} handleSetBookmark={() => handleSetBookmark(bookmark)} handleRemoveBookmark={() => handleRemoveBookmark(bookmark)} isPending={isPending}/>
        ))}
      </div>   
    </>
  );
}

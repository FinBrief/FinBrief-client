import { useQuery } from "@tanstack/react-query";
import { fetchUserBookmarks } from "@/actions/bookmarks";
import { Post } from "@/lib/types";

async function getBookmarks(): Promise<Post[]> {
  const data = await fetchUserBookmarks();
  if ('savedPosts' in data) {
    return data.savedPosts.map(post => ({
      ...post,
      pubDate: post.pubDate.toISOString(),
      users: []
    }));
  }
  return [];
}

export const useBookmark = () => {
  return useQuery({
    queryKey: ["bookmarks"],
    queryFn: getBookmarks,
    refetchOnWindowFocus: false,
    staleTime: Infinity
  });
}
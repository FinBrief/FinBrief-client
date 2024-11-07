import { useQuery } from "@tanstack/react-query";
import { fetchUserBookmarks } from "@/actions/bookmark";

async function getBookmarks(): Promise<string[]> {
  const data = await fetchUserBookmarks();
  if ('savedPosts' in data) {
    return data.savedPosts.map((post: { id: string }) => post.id);
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
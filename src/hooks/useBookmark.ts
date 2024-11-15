'use client';

import { useState } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { fetchUserBookmarks, setUserBookmark, removeUserBookmark } from "@/actions/bookmarks";
import { Post } from "@/lib/types";
import { toast } from "sonner";

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

export const useHandleBookmark = () => {
  const [isPending, setIsPending] = useState(false);
  const queryClient = useQueryClient();

  const handleSetBookmark = async (post: Post) => {
    setIsPending(true); 
    const res = await setUserBookmark(post.id);

    if (res.success) {
      toast.success('Post bookmarked');
      queryClient.setQueryData(
        ['bookmarks'], 
        (oldData: Post[]) => oldData ? [...oldData, post] : oldData
      );
    } else {
      toast.error('Failed to bookmark post');
    }
    setIsPending(false);
  }

  const handleRemoveBookmark = async (post: Post) => {
    setIsPending(true);
    const res = await removeUserBookmark(post.id);
  
    if (res.success) {
      toast.success('Post removed from bookmarks');
      queryClient.setQueryData(
        ['bookmarks'], 
        (oldData: Post[]) => oldData ? oldData.filter((p) => p.id !== post.id) : oldData
      );
    } else {
      toast.error('Failed to remove post from bookmarks');
    }
    setIsPending(false);
  }

  return { handleSetBookmark, handleRemoveBookmark, isPending };
}

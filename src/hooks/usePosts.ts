/*import { useInfiniteQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useInView } from 'react-intersection-observer';
import { useEffect } from 'react';
import { toast } from 'sonner';
import { removeUserBookmark, setUserBookmark } from '@/actions/bookmarks';
import { Post } from '@/lib/types';

// Hook for fetching posts
export function usePosts(bookmarkIds: string[] | undefined) {
  const queryClient = useQueryClient();

  const isBookmark = (postId: string) => bookmarkIds ? bookmarkIds.includes(postId) : false;

  const fetchPosts = async ({ pageParam = undefined }) => {
    const res = await fetch(`/api/posts?cursor=${pageParam ? pageParam : ''}`);
    if (!res.ok) {
      throw new Error('Failed to fetch posts');
    }
    const data = await res.json();
    return data;
  };

  const {
    data,
    error,
    fetchNextPage,
    hasNextPage,
    isFetching,
    isFetchingNextPage,
    status
  } = useInfiniteQuery({
    queryKey: ['posts'],  
    queryFn: fetchPosts,
    initialPageParam: undefined,
    getNextPageParam: (lastPage) => lastPage.nextCursor
  });

  const { ref, inView } = useInView();

  useEffect(() => {
    if (inView && hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [inView, fetchNextPage, hasNextPage, isFetchingNextPage]);

  const setBookmarkMutation = useMutation({
    mutationFn: (postId: string) => setUserBookmark(postId),
    onSuccess: (_, postId) => {
      toast.success('Post bookmarked');
      queryClient.setQueryData(
        ['bookmarks'],
        (oldData: string[]) => oldData ? [...oldData, postId] : oldData
      );
    },
    onError: () => {
      toast.error('Failed to bookmark post');
    }
  });

  const removeBookmarkMutation = useMutation({
    mutationFn: (postId: string) => removeUserBookmark(postId),
    onSuccess: (_, postId) => {
      toast.success('Post removed from bookmarks');
      queryClient.setQueryData(
        ['bookmarks'],
        (oldData: string[]) => oldData ? oldData.filter((id) => id !== postId) : oldData
      );
    },
    onError: () => {
      toast.error('Failed to remove post from bookmarks');
    }
  });

  return {
    data,
    error,
    fetchNextPage,
    hasNextPage,
    isFetching,
    isFetchingNextPage,
    status,
    ref,
    isBookmark,
    handleSetBookmark: setBookmarkMutation.mutate,
    handleRemoveBookmark: removeBookmarkMutation.mutate
  };
}*/
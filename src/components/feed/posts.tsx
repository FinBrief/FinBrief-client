"use client";

import { useState, useEffect, Fragment } from 'react';
import { useInfiniteQuery, useQueryClient } from '@tanstack/react-query';
import { useInView } from 'react-intersection-observer';
import { PostLoader as Loader } from '@/components/loaders';
import { Post } from '@/lib/types';
import { PostCard } from '@/components/feed/postCard';
import { useHandleBookmark } from '@/hooks/useBookmark';

export default function Posts({ bookmarkIds, tags }: { bookmarkIds: string[] | undefined, tags: string[] | undefined }) {
  const { handleSetBookmark, handleRemoveBookmark, isPending } = useHandleBookmark();

  const isBookmark = (postId: string) => bookmarkIds ? bookmarkIds.includes(postId) : false;

  const fetchPosts = async ({ pageParam = undefined }) => {
    const tagsQuery = tags ? `&tags=${tags.join(',')}` : '';
    const res = await fetch(`/api/posts?cursor=${pageParam || ''}${tagsQuery}`);
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
    queryKey: ['posts', tags],  
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
  

  if (status === 'pending') return (
    <Loader />
  )

  if (status === 'error') return (
    <div className="flex justify-center items-center h-screen">Error: {error?.message}</div>
  )

  return (
    <div className="max-w-7xl">
      <div className={`grid grid-cols-1 gap-6 min-[550px]:grid-cols-2 lg:grid-cols-3 w-full`}>
        {data && data.pages.map((page, pageIndex) => (
          <Fragment key={pageIndex}>
            {page.posts.map((post: Post) => (
              <PostCard key={post.id} post={post} isBookmark={isBookmark(post.id)} isPending={isPending} handleSetBookmark={() => handleSetBookmark(post)} handleRemoveBookmark={() => handleRemoveBookmark(post)}/>
            ))}
          </Fragment>
        ))}
      </div>
      <div ref={ref} className="flex justify-center items-center p-4">
        {isFetchingNextPage ? 'Loading more posts...' : hasNextPage ? 'Scroll to load more' : 'No more posts'}
      </div>
    </div> 
  )
}


/*const queryClient = useQueryClient();

  const isBookmark = (postId: string) => bookmarkIds ? bookmarkIds.includes(postId) : false;

  //TODO: Disbales all bookmarks, change to only active button
  const handleSetBookmark = async (postId: string) => {
    setIsPending(true); 
    const res = await setUserBookmark(postId);

    if (res.success) {
      toast.success('Post bookmarked');
      queryClient.setQueryData(
        ['bookmarks'], 
        (oldData: string[]) => oldData ? [...oldData, postId] : oldData
      );
    } else {
      toast.error('Failed to bookmark post');
    }
    setIsPending(false);
  }

  const handleRemoveBookmark = async (postId: string) => {
    setIsPending(true);
    const res = await removeUserBookmark(postId);
  
    if (res.success) {
      toast.success('Post removed from bookmarks');
      queryClient.setQueryData(
        ['bookmarks'], 
        (oldData: string[]) => oldData ? oldData.filter((id) => id !== postId) : oldData
      );
    } else {
      toast.error('Failed to remove post from bookmarks');
    }
    setIsPending(false);
  }

  const fetchPosts = async ({ pageParam = undefined }) => {
    const tagsQuery = tags ? `&tags=${tags.join(',')}` : '';
    const res = await fetch(`/api/posts?cursor=${pageParam || ''}${tagsQuery}`);
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
  }, [inView, fetchNextPage, hasNextPage, isFetchingNextPage]); */
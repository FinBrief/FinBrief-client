"use client";

import { useState, useEffect, useRef, Fragment } from 'react';
import { useInfiniteQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useInView } from 'react-intersection-observer';
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card"
import { ExternalLink, Bookmark } from 'lucide-react';
import { relativeTime } from '@/lib/relativeTime';
import { PostLoader as Loader } from '@/components/loaders';
import PostDialog from './postDialog';
import { Button } from '@/components/ui/button';
import { Post } from '@/lib/types';
import { toast } from 'sonner';
import { removeUserBookmark, setUserBookmark } from '@/actions/bookmark';
import { useSidebar } from '@/components/ui/sidebar';

export default function Posts({ bookmarkIds }: { bookmarkIds: string[] | undefined }) {
  const [isPending, setIsPending] = useState(false);
  const queryClient = useQueryClient();

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

  if (status === 'pending') return (
    <Loader />
  )

  if (status === 'error') return (
    <div className="flex justify-center items-center h-screen">Error: {error.message}</div>
  )

  return (
    <div className="max-w-7xl">
      <div className={`grid grid-cols-1 gap-6 min-[550px]:grid-cols-2 lg:grid-cols-3 w-full`}>
        {data && data.pages.map((page, pageIndex) => (
          <Fragment key={pageIndex}>
            {page.posts.map((post: Post) => (
              <Card key={post.id} className="flex flex-col justify-between p-4 group">
                <PostDialog post={post} isBookmark={isBookmark(post.id)} handleSetBookmark={() => handleSetBookmark(post.id)} handleRemoveBookmark={() => handleRemoveBookmark(post.id)}>
                  <div className="flex flex-col gap-2">
                    <div className="font-bold">{post.title}</div>
                    <div className="flex flex-wrap gap-1">
                      {post.tags && post.tags.map((tag) => (
                        <Badge key={tag.id} variant="secondary">#{tag.name}</Badge>
                      ))}
                    </div>
                    <div>
                      {post.summary.length > 300 
                        ? `${post.summary.slice(0,300)}...` 
                        : post.summary}
                    </div>  
                  </div>
                </PostDialog>
                <div className="flex justify-between items-center text-sm mt-2">
                  <div className="flex gap-1 text-muted-foreground">
                    {relativeTime(post.pubDate)}
                    <span> • </span>
                    <a href={post.link} target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:text-blue-500">
                      <div className="flex items-center gap-1">
                        {post.source.name} 
                        <ExternalLink className="h-3 w-3" />
                      </div>
                    </a>
                  </div>                 
                  {bookmarkIds && bookmarkIds.includes(post.id) ? (
                    <div className="flex items-center gap-2">
                      <Button 
                        variant="ghost" 
                        size="icon" 
                        onClick={() => handleRemoveBookmark(post.id)}
                        disabled={isPending}
                      >
                        <Bookmark className="h-4 w-4 text-blue-500 fill-blue-500" />
                      </Button>
                    </div>
                  ) : (
                    <div className="flex items-center gap-2 lg:group-hover:opacity-100 lg:opacity-0 lg:transition-opacity duration-250">
                      <Button 
                        variant="ghost" 
                        size="icon" 
                        onClick={() => handleSetBookmark(post.id)}
                        disabled={isPending}
                      >
                        <Bookmark className="h-4 w-4" />
                      </Button>
                    </div>
                  )}
                </div>
              </Card>
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
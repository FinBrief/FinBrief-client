"use client";

import { useEffect, Fragment, useState } from 'react';
import { useInfiniteQuery, useMutation } from '@tanstack/react-query';
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
import { setUserBookmark, removeUserBookmark } from '@/actions/bookmark';
import { useQueryClient } from '@tanstack/react-query';

export default function Posts({ bookmarkIds }: { bookmarkIds: string[] | undefined }) {
  const [bookmarks, setBookmarks] = useState<string[]>([]);
  const [isPending, setIsPending] = useState(false);

  const queryClient = useQueryClient();

  useEffect(() => {
    if (bookmarkIds) {
      setBookmarks(bookmarkIds);
    }
  }, [bookmarkIds]);

  /*const { mutate: setBookmark } = useMutation({
    mutationFn: (postId: string) => setUserBookmark(postId),
    onMutate: () => {
      setIsPending(true);
    },
    onSuccess: () => {
      setIsPending(false);
      toast.success('Post bookmarked');
    }
  });

  const { mutate: removeBookmark } = useMutation({
    mutationFn: (postId: string) => removeUserBookmark(postId),
  });*/

  const handleSetBookmark = async (postId: string) => {
    setBookmarks([...bookmarks, postId]);
    const res = await setUserBookmark(postId);
    if (res.success) {
      toast.success('Post bookmarked');
      //queryClient.invalidateQueries({ queryKey: ['posts'] });
    } else {
      toast.error('Failed to bookmark post');
      //remove bookmark
    }
  }

  const handleRemoveBookmark = async (postId: string) => {
    setBookmarks(bookmarks.filter((id) => id !== postId));
    const res = await removeUserBookmark(postId);
    if (res.success) {
      toast.success('Post removed from bookmarks');
      //queryClient.invalidateQueries({ queryKey: ['posts'] });
    } else {
      toast.error('Failed to remove post from bookmarks');
      //add bookmark
    }
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
    <>
      <div className="grid grid-cols-1 gap-6 min-[550px]:grid-cols-2 lg:grid-cols-3">
        {data && data.pages.map((page, pageIndex) => (
          <Fragment key={pageIndex}>
            {page.posts.map((post: Post) => (
              <Card key={post.id} className="flex flex-col justify-between p-4 group">
                <PostDialog post={post}>
                  <div className="flex flex-col gap-2">
                    <div className="font-bold">{post.title}</div>
                    <div className="flex flex-wrap gap-2">
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
                    <a href={post.link} target="_blank" rel="noopener noreferrer" className="text-blue-500">
                      <div className="flex items-center gap-1">
                        {post.source.name} 
                        <ExternalLink className="h-3 w-3" />
                      </div>
                    </a>
                  </div>                 
                  {bookmarks && bookmarks.includes(post.id) ? (
                      <div className="flex items-center gap-2">
                      <Button variant="ghost" size="icon" disabled={isPending} onClick={() => handleRemoveBookmark(post.id)}>
                        <Bookmark className="h-4 w-4 text-blue-500 fill-blue-500" />
                      </Button>
                    </div>
                  ) : (
                    <div className="flex items-center gap-2 group-hover:opacity-100 opacity-0 transition-opacity duration-250">
                      <Button variant="ghost" size="icon" disabled={isPending} onClick={() => handleSetBookmark(post.id)}>
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
    </> 
  )
}
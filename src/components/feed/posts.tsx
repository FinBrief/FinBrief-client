"use client";

import { useEffect, Fragment } from 'react';
import { useInfiniteQuery } from '@tanstack/react-query';
import { useInView } from 'react-intersection-observer';
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { relativeTime } from '@/lib/relativeTime';
import { PostLoader as Loader } from '@/components/loaders';
import PostDialog from './postDialog';

interface Tag {
  id: string;
  name: string;
}

interface Source {
  id: string;
  name: string;
}

export interface Post {
  id: string;
  title: string;
  summary: string;
  link: string;
  pubDate: string;
  tags: Tag[];
  users: { id: string; username: string }[];
  sourceId: string;
  source: Source;
}

interface ApiResponse {
  posts: Post[];
  nextCursor: string | null;
}

export default function Posts() {
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
              <PostDialog key={post.id} post={post}>
                <Card className="p-4">
                  <div className="flex items-center justify-between mb-2">
                    <div className="font-bold">{post.title}</div>
                    <div className="flex flex-wrap gap-2">
                      {post.tags && post.tags.map((tag) => (
                        <Badge key={tag.name} variant="secondary">#{tag.name}</Badge>
                      ))}
                    </div>
                  </div>
                  <div className="text-sm text-muted-foreground mb-2">
                    {relativeTime(post.pubDate)}
                    <span className="text-muted-foreground"> • {post.source.name}</span>
                  </div>
                  <div className="flex flex-col space-y-2">
                    {post.summary.slice(0,150)}
                  </div>
                  <div className="flex items-center text-sm pt-2">
                    <a href={post.link} target="_blank" rel="noopener noreferrer" className="text-blue-500">
                      Read more
                    </a>
                  </div>   
                </Card>
              </PostDialog>
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
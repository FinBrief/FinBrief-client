"use client";

import { useQuery } from '@tanstack/react-query';
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { relativeTime } from '@/lib/relativeTime';
import Loader from '../profile/loader';
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

export default function Posts() {

  const { isLoading, error, data } = useQuery<Post[]>({
    queryKey: ['posts'],  
    queryFn: async () => {
      const res = await fetch('/api/posts');
      if (!res.ok) {
        throw new Error('Failed to fetch posts');
      }
      const data = await res.json();
      return data;
    }
  })

  if (isLoading) return (
    <Loader />
  )

  if (error) return (
    <div className="flex justify-center items-center h-screen">Error: {error.message}</div>
  )

  return (
    <div className="grid grid-cols-1 gap-2 min-[550px]:grid-cols-2 lg:grid-cols-3">
      {data && data.map((post) => (
        <PostDialog key={post.id} post={post}>
         <Card  className="p-4 bg-white">
            <div className="flex items-center justify-between mb-2">
              <div className="font-bold">{post.title}</div>
              <div className="flex flex-wrap gap-2">
                {post.tags && post.tags.map((tag) => (
                  <Badge key={tag.id} variant="secondary">{tag.name}</Badge>
                ))}
              </div>
            </div>
            <div className="text-sm text-muted-foreground mb-2">
              {relativeTime(post.pubDate)}
            </div>
            <div className="flex flex-col space-y-2">
              {post.summary}
            </div>
            <div className="flex items-center text-sm pt-2">
              <a href={post.link} target="_blank" rel="noopener noreferrer" className="text-blue-500">
                Read more
              </a>
            </div>   
          </Card>
        </PostDialog>
      ))}
    </div>
  )
}
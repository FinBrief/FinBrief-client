import { Post } from "@/lib/types";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card"
import { ExternalLink, Bookmark } from 'lucide-react';
import { relativeTime } from '@/lib/relativeTime';
import PostDialog from '@/components/feed/postDialog';
import { Button } from '@/components/ui/button';

export function PostCard({ post, isBookmark, handleSetBookmark, handleRemoveBookmark, isPending }: { post: Post, isBookmark: boolean, handleSetBookmark: (post: Post) => void, handleRemoveBookmark: (post: Post) => void, isPending: boolean }) {
  return (
    <Card className="flex flex-col justify-between p-4 group">
      <PostDialog post={post} isBookmark={isBookmark} handleSetBookmark={() => handleSetBookmark(post)} handleRemoveBookmark={() => handleRemoveBookmark(post)} isPending={isPending}>
        <div className="flex flex-col gap-2">
          <div className="font-bold text-lg leading-snug">{post.title}</div>
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
        {isBookmark ? (
          <div className="flex items-center gap-2">
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={() => handleRemoveBookmark(post)}
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
              onClick={() => handleSetBookmark(post)}
              disabled={isPending}
            >
              <Bookmark className="h-4 w-4" />
            </Button>
          </div>
        )}
      </div>
    </Card>
  )
}
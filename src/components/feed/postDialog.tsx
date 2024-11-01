import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import { relativeTime } from "@/lib/relativeTime"
import { Post } from "@/lib/types"

export default function PostDialog({children,post}:{children:React.ReactNode,post: Post}) { 
  return (
    <Dialog>
      <DialogTrigger asChild className="hover:cursor-pointer">
        {children}
      </DialogTrigger>
      <DialogContent className="flex flex-col space-y-1 w-1/2 h-1/2">
        <DialogHeader>
          <DialogTitle>
            <a href={post.link} target="_blank" rel="noopener noreferrer" className="text-blue-500">
              {post.title}
            </a>
          </DialogTitle>
          <DialogDescription>
            {relativeTime(post.pubDate)}
          </DialogDescription>
        </DialogHeader>
        <div className="flex flex-wrap gap-2">
          {post.tags && post.tags.map((tag) => (
            <Badge variant="secondary" key={tag.name}>#{tag.name}</Badge>
          ))}
        </div>
        <div> {post.summary} </div>
      </DialogContent>
    </Dialog>
  )
}

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
import { ExternalLinkIcon } from "@radix-ui/react-icons"

export default function PostDialog({children, post}:{children:React.ReactNode, post: Post}) { 
  return (
    <Dialog>
      <DialogTrigger asChild className="hover:cursor-pointer">
        {children}
      </DialogTrigger>
      <DialogContent className="flex flex-col min-h-content max-h-screen overflow-y-auto">
        <DialogHeader className="space-y-4">
          <DialogTitle className="text-lg text-left mr-4">
            <a href={post.link} target="_blank" rel="noopener noreferrer" className="text-blue-500">
              {post.title} <ExternalLinkIcon className="w-4 h-4" />
            </a>
          </DialogTitle>
          <DialogDescription className="flex flex-wrap gap-1">
            {post.tags && post.tags.map((tag) => (
              <Badge variant="secondary" key={tag.name}>#{tag.name}</Badge>
            ))}  
          </DialogDescription>
        </DialogHeader>
        <div className="flex flex-col gap-2"> 
          <div>
            {post.summary}
          </div>
          <div className="text-sm text-gray-400">
            <div>
              {relativeTime(post.pubDate)}
            </div>
            <div>
              
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}

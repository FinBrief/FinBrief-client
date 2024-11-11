import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { relativeTime } from "@/lib/relativeTime"
import { Post } from "@/lib/types"
import { ExternalLinkIcon } from "@radix-ui/react-icons"
import { Bookmark } from "lucide-react"

export default function PostDialog({children, post, isBookmark, handleSetBookmark, handleRemoveBookmark}:{children:React.ReactNode, post: Post, isBookmark: boolean, handleSetBookmark: () => void, handleRemoveBookmark: () => void}) { 
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
          <div className="flex flex-wrap gap-1">
            {post.tags && post.tags.map((tag) => (
              <Badge variant="secondary" key={tag.name}>#{tag.name}</Badge>
            ))}  
          </div>
        </DialogHeader>
        <div className="flex flex-col gap-2"> 
          <DialogDescription>
            {post.summary}
          </DialogDescription>
          <div className="text-sm text-gray-400 flex justify-between items-center mt-2">
            <div>
              {relativeTime(post.pubDate)}
            </div>
            <div>
              {isBookmark ? (
                <Button variant="outline" onClick={handleRemoveBookmark}>
                  Remove <Bookmark className="h-4 w-4 ml-1 text-blue-500 fill-blue-500" />
                </Button>
              ) : (
                <Button variant="outline" onClick={handleSetBookmark}>
                  Add <Bookmark className="h-4 w-4 ml-1" />
                </Button>
              )}
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}

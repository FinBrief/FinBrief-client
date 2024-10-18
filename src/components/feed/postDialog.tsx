import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
  } from "@/components/ui/dialog"
import { Post } from "./posts"


export default function PostDialog({children,post}:{children:React.ReactNode,post: Post}) { 
    return (
        <Dialog>
        <DialogTrigger asChild className="hover:cursor-pointer">
            {/* <button>{children}</button> */}
            {children}
        </DialogTrigger>
        <DialogContent className="w-1/2 h-1/2">
            {/* <DialogHeader>
            <DialogTitle className="text-2xl">Dialog Title</DialogTitle>
            </DialogHeader> */}
            <DialogDescription className="grid">
                    <h3 className="justify-self-start">{post.title}</h3>
                    <div>{post.pubDate.slice(0,10)}</div>

                    <div>
                        {post.summary}
                    </div>
                    <div>
                        <button onClick={()=>{
                            window.open(post.link)
                        }}>
                        LINK
                        </button>
                        </div>
                    <div>tags</div>
            </DialogDescription>
        </DialogContent>
        </Dialog>
    )
}

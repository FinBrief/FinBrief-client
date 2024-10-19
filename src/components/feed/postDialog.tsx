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
            <DialogDescription className="laptop:flex-row laptop:pb-0 flex flex-col w-full pb-6 bg-background-default">
                   <div className="my-6 break-words font-bold text-4xl">
                    {post.title}
                   </div>

                    <div className="mb-6 text-lg border-l-4 border-sky-400 pl-4">
                        {post.summary}
                    </div>
                    <div className="mb-3 text-base">
                        Published: {post.pubDate.slice(0,10)}
                    </div>
                    <div className="flex flex-wrap gap-2 text-base mb-4">
                        <div className="border rounded p-1 font-semibold">#Tag1</div>
                        <div className="border rounded p-1 font-semibold">#Tag1</div>
                        <div className="border rounded p-1 font-semibold">#Tag1</div>
                        <div className="border rounded p-1 font-semibold">#Tag1</div>
                    </div>
                    <div className="flex justify-center my-5">
                        <button className="border rounded-md hover:border-dotted border-slate-400 text-base font-semibold w-24  p-2 " onClick={()=>{
                            window.open(post.link)
                        }}>
                        LINK
                        </button>
                        </div>
            </DialogDescription>
        </DialogContent>
        </Dialog>
    )
}

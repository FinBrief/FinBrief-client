import { Link } from "lucide-react";
import { Button } from "../ui/button";
import { usePathname } from "next/navigation";

export default function LeftSheet() {
  const pathname = usePathname(); 
    return (
      <div className="flex flex-col h-full">
        <nav>
          <div className="flex flex-col gap-2 mr-2">
           
              <Button variant="ghost" className={`justify-start w-full ${pathname === "/feed/all" ? "font-bold bg-gray-100 dark:bg-zinc-800" : ""}`}>
              <Link href="/feed/all">
                All posts
              </Link>
            </Button>
            <Link href="/feed/custom">
              <Button variant="ghost" className={`justify-start w-full ${pathname === "/feed/custom" ? "font-bold bg-gray-100 dark:bg-zinc-800" : ""}`}>
                Custom feed
              </Button>    
            </Link>
            <Link href="/profile">
              <Button variant="ghost" className="justify-start w-full">
                Bookmarks
              </Button>
            </Link>
          </div>
          </nav>
        <div className="flex-1"></div>
        <nav className="flex flex-col gap-2 mb-2 px-1">
          <div>Sources</div>
          <div>Submit a source</div>
          <div>Feedback</div>
        </nav>
      </div>
    )
} 
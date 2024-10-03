"use client";

import { ModeToggle } from "@/components/theme/mode-toggle"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

export default function UserFeed() {
  return (
    <div className="flex min-h-screen bg-background text-foreground">
      <aside className="w-64 p-4 border-r">
        <div className="space-y-2">
          <div className="font-bold text-xl">My feed</div>
          <div className="space-y-2">
            <div>Custom feed</div>
            <div className="font-bold">Discover</div>
            <div>Explore</div>
            <div>Discussions</div>
            <div>Tags</div>
            <div>Sources</div>
            <div>Leaderboard</div>
            <div className="font-bold">Activity</div>
            <div>Submit a link</div>
            <div>Bookmarks</div>
            <div>History</div>
          </div>
          <div className="font-bold">Docs</div>
          <div>Changelog</div>
          <div>Feedback</div>
        </div>
      </aside>
      <main className="flex-1 p-6">
        <header className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-4">
            <h1 className="text-2xl font-bold">Feed settings</h1>
          </div>
          <div className="flex items-center space-x-4">
            <Input type="search" placeholder="Search" className="w-64" />
            <Button variant="default">New post</Button>
            <ModeToggle />
          </div>
        </header>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 6 }).map((_, index) => (
            <Card key={index} className="p-4">
              <div className="flex items-center justify-between mb-2">
                <div className="font-bold">News Title {index + 1}</div>
                <Badge variant="secondary">#tag</Badge>
              </div>
              <div className="text-sm text-muted-foreground mb-2">Jul 19 • 25m read time</div>
              <div className="flex flex-col space-y-2">
                <div>TLDR</div>
                <div>TLDR</div>
                <div>TLDR</div>
                <div>TLDR</div>
              </div>
              <div className="flex items-center space-x-4 text-sm">
                <div>1.1K</div>
                <div>22</div>
                <div>8</div>
              </div>
            </Card>
          ))}
        </div>
      </main>
    </div>
  );
}

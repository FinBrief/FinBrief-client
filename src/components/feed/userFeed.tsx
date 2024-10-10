"use client";

import Link from "next/link";
import { signOut } from "@/actions/userAuth";
import { ModeToggle } from "@/components/theme/mode-toggle"
import { ProfileDropdown } from "./profile/profileDropdown";
import { ProfileSheet } from "./infoSheet";
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { SettingsIcon } from "lucide-react";

export default function UserFeed() {


  return (
    <div className="flex flex-col min-h-screen w-full">
      <nav className="flex w-full items-center justify-between px-4 p-2 border-b">
        <Link href="/">
          <div className="font-bold text-3xl">FinBrief.</div>
        </Link>
        <div className="flex items-center gap-2 bg-gray-200 dark:bg-black space-x-4 p-1 rounded-lg">
          <ProfileDropdown />
          <ModeToggle />
        </div>
      </nav>
      <div className="flex bg-background text-foreground w-full">
        <aside className="hidden md:block w-55 lg:w-64 p-4 pt-6 border-r">
          <div className="space-y-4">
            <div className="flex items-start">
              
              <Button variant="ghost">
              <div className="text-xl font-bold mr-2">
                Edit feed
              </div>
                <SettingsIcon />
                
              </Button>
            </div>
            <div className="space-y-2">
              <div>Custom feed</div>
              <div className="font-bold">Discover</div>
              <div>Explore</div>
              <div>Discussions</div>
              <div>Tags</div>
              <div>Sources</div>
              <div>Submit a link</div>
              <div>Bookmarks</div>
            </div>
          </div>
        </aside>
        <main className="flex-1 p-4 px-4 mt-2">
          <div className="grid grid-cols-1 gap-2 min-[550px]:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 6 }).map((_, index) => (
              <Card key={index} className="p-4 bg-white">
                <div className="flex items-center justify-between mb-2">
                  <div className="font-bold">News Title {index + 1}</div>
                  <Badge variant="secondary">#tag</Badge>
                </div>
                <div className="text-sm text-muted-foreground mb-2">Jul 19 • 30 mins ago</div>
                <div className="flex flex-col space-y-2">
                  <div>Lorem ipsum dolor sit amet consectetur adipisicing elit. Consequatur nemo debitis nulla corrupti qui maxime nisi minus voluptate itaque, ad, iure nostrum sint corporis enim. Praesentium atque enim optio reprehenderit.</div>
                  <div>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Culpa facere quibusdam rem consequuntur fuga minus suscipit cumque aliquam, sunt animi modi accusamus quam harum pariatur nobis temporibus aut tempora dolorum?</div>
                </div>
                <div className="flex items-center text-sm pt-2">
                  <div>Read later</div>
                </div>
              </Card>
            ))}
          </div>
        </main>
      </div>
    </div>
  );
}

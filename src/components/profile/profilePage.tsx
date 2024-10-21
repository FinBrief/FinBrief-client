'use client'

import { useState, useEffect, Suspense, lazy } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ModeToggle } from "@/components/theme/mode-toggle"
import { ArrowLeft } from "lucide-react"
import { ProfileLoader as Loader } from "@/components/loaders"

const ProfileSettings = lazy(() => import("./profileSettings"))
const ProfileTags = lazy(() => import("./profileTags"))
const ProfileBookmarks = lazy(() => import("./bookmarks"))

export default function ProfilePage({ params: { email, username } }: { params: { email?: string, username?: string } }) 
{
  const [activeTab, setActiveTab] = useState("profile")

  const handleTabChange = (tab: string) => {
    setActiveTab(tab)
  }

  return (
    <div className="flex min-h-screen w-full flex-col">
      <header className="sticky top-0 flex h-16 items-center gap-4 bg-background px-4 border-b">
        <div className="flex w-full justify-between items-center">
          <h1 className="text-3xl font-bold">
            FinBrief.
          </h1>
          <ModeToggle />
        </div>
      </header>
      <main className="flex min-h-[calc(100vh_-_theme(spacing.16))] flex-1 flex-col gap-4 bg-muted/40 p-4 md:gap-8 md:p-8">
        <div className="mx-auto grid w-full max-w-6xl items-start gap-6 md:grid-cols-[180px_1fr] lg:grid-cols-[250px_1fr]">
          <aside className="flex flex-col w-max gap-4 text-sm text-muted-foreground">
            <Link href="/feed">
              <Button variant="secondary" className="gap-2 p-2 text-xl font-semibold">
                <ArrowLeft size={20} />
                Back to feed
              </Button>
            </Link>
            <Button
              onClick={() => handleTabChange('profile')}
              className={`text-base justify-start ${activeTab === 'profile' ? 'font-semibold text-primary' : ''}`}
              variant="ghost"
            >
              Profile
            </Button>
            <Button
              onClick={() => handleTabChange('tags')}
              className={`text-base justify-start ${activeTab === 'tags' ? 'font-semibold text-primary' : ''}`}
              variant="ghost"
            >
              Tags
            </Button>
            <Button
              onClick={() => handleTabChange('bookmarks')}
              className={`text-base justify-start ${activeTab === 'bookmarks' ? 'font-semibold text-primary' : ''}`}
              variant="ghost"
            >
              Bookmarks
            </Button>
          </aside>
          <Suspense fallback={<Loader />}>
            {activeTab === "profile" && <ProfileSettings email={email || "email"} username={username || "username"} />}
            {activeTab === "tags" && <ProfileTags />}
            {activeTab === "bookmarks" && <ProfileBookmarks />}
          </Suspense>
        </div>
      </main>
    </div>
  )
}
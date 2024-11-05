"use client";

import { useState } from "react";
import Posts from "./posts";
import { EditFeedDialog } from "./editFeedDialog";
import { Tag } from "@/lib/types";
import { useBookmark } from "@/hooks/useBookmark";

const tags = [
  {id: "1", name: "Top News"},
  {id: "2", name: "World news"},
  {id: "3", name: "India news"},
  {id: "4", name: "Europe news"},
  {id: "5", name: "Asia news"},
  {id: "6", name: "Business"},
  {id: "7", name: "Earnings"},
  {id: "8", name: "Economy"},
  {id: "9", name: "Finance"},
  {id: "10", name: "Tech"},
  {id: "11", name: "Politics"},
  {id: "12", name: "Health care"},
  {id: "13", name: "Small business"},
  {id: "14", name: "Energy"},
  {id: "15", name: "Retail"},
  {id: "16", name: "Investing"},
  //add more
]

export default function UserFeed() {
  const [selectedTags, setSelectedTags] = useState<Tag[]>([]);

  const { data: bookmarkIds } = useBookmark();

  const onTagClick = (tag: Tag) => {
    setSelectedTags(prev => 
      prev.some(t => t.id === tag.id)
        ? prev.filter(t => t.id !== tag.id)   
        : [...prev, tag]
    );
  };

  return (
    <>
      <div className="pb-6">
        <EditFeedDialog tags={tags} selectedTags={selectedTags} onTagClick={onTagClick} />
      </div>
      <Posts bookmarkIds={bookmarkIds} />     
    </>
  );
}

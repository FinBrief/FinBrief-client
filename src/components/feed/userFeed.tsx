"use client";

import { useState } from "react";
import Posts from "./posts";
import { EditFeedDialog } from "./editFeedDialog";
import { Tag } from "@/lib/types";
import { useBookmark } from "@/hooks/useBookmark";



export default function UserFeed() {
  const { data: bookmarkIds } = useBookmark();

  return (
    <>
      <Posts bookmarkIds={bookmarkIds} />     
    </>
  );
}

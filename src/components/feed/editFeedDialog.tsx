"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import { SettingsIcon, CheckIcon } from "lucide-react"
import { Tag } from "@/lib/types"
import { setUserTags } from "@/actions/setUserTags"

interface EditFeedDialogProps {
  tags: Tag[];
  selectedTags: Tag[];
  onTagClick: (tag: Tag) => void;
}

export function EditFeedDialog({tags, selectedTags, onTagClick}: EditFeedDialogProps) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="default" aria-label="Edit Feed" className="px-2 font-bold text-lg "> 
          Edit feed 
          <SettingsIcon className="ml-2 w-5 h-5" /> 
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit your feed</DialogTitle>
          <DialogDescription>
            Select the topics you want to see in your feed and click save.
          </DialogDescription>  
        </DialogHeader>
        <div className="flex flex-wrap gap-3">
          {tags.map((tag) => {
            let isSelected = selectedTags.some(t => t.id === tag.id);
            return (  
              <Badge 
                key={tag.id} 
                variant={isSelected ? "selected" : "outline"}
                className="h-10 w-fit cursor-pointer"
                onClick={() => onTagClick(tag)}
              >
                {isSelected && <CheckIcon className="w-4 h-4 mr-2" />}
                <div>{tag.name}</div>
              </Badge>
            );
          })}
        </div>
        <DialogFooter>
          <Button type="submit" onClick={() => setUserTags(selectedTags)}>Save</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

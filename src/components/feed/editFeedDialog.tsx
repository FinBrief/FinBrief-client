"use client"

import { useState, useEffect } from "react"
import { useQueryClient } from "@tanstack/react-query"
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
import { setUserTags } from "@/actions/userTags"
import { toast } from "sonner"
import { useTags } from "@/hooks/useTags"

const tagsData = [
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

export function EditFeedDialog() {
  const [selectedTags, setSelectedTags] = useState<Tag[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [isPending, setIsPending] = useState(false);
  
  const queryClient = useQueryClient();
  const { data: tags } = useTags();

  useEffect(() => {
    if (tags) {
      setSelectedTags(tags);
    }
  }, [tags]);

  const onTagClick = (tag: Tag) => {
    setSelectedTags(prev => 
      prev.some(t => t.id === tag.id)
        ? prev.filter(t => t.id !== tag.id)   
        : [...prev, tag]
    );
  };

  const handleSave = async () => {
    setIsPending(true);
    const { error } = await setUserTags(selectedTags);
    if (error) {
      console.error(error);
      toast.error("Failed to update tags");
      setIsPending(false);
      return;
    }
    toast.success("Tags updated");
    queryClient.setQueryData(["tags"], selectedTags);
    setIsPending(false);
    setIsOpen(false);
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="secondary" aria-label="Edit Feed" className="px-2 font-bold text-lg "> 
          Edit feed 
          <SettingsIcon className="ml-2 w-5 h-5" /> 
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-xl">
        <DialogHeader>
          <DialogTitle>Edit your feed</DialogTitle>
          <DialogDescription>
            Select the topics you want to see in your feed and click save.
          </DialogDescription>  
        </DialogHeader>
        <div className="flex flex-wrap gap-3">
          {tagsData.map((tag) => {
            let isSelected = selectedTags.some(t => t.id === tag.id);
            return (  
              <Badge 
                key={tag.id} 
                variant={isSelected ? "selected" : "outline"}
                className="h-10 w-fit cursor-pointer"
                onClick={() => onTagClick(tag)}
              >
                {isSelected && <CheckIcon className="w-4 h-4 mr-2 animate-in" />}
                {tag.name}
              </Badge>
            );
          })}
        </div>
        <DialogFooter>
          <Button 
            onClick={handleSave} 
            disabled={isPending}
          >
            {isPending ? "Saving..." : "Save"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

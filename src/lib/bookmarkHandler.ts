import { useQueryClient } from "@tanstack/react-query";
import { setUserBookmark, removeUserBookmark } from "@/actions/bookmark";
import { toast } from "sonner";

const queryClient = useQueryClient();

export const handleSetBookmarkx = async (postId: string) => {
  const res = await setUserBookmark(postId);

  if (res.success) {
    toast.success('Post bookmarked');
    queryClient.setQueryData(
      ['bookmarks'], 
      (oldData: string[]) => [...oldData, postId]
    );
  } else {
    toast.error('Failed to bookmark post');
  }
}


export const handleRemoveBookmarkx = async (postId: string) => {
  const res = await removeUserBookmark(postId);

  if (res.success) {
    toast.success('Post removed from bookmarks');
    queryClient.setQueryData(
      ['bookmarks'], 
      (oldData: string[]) => oldData.filter((id) => id !== postId)
    );
  } else {
    toast.error('Failed to remove post from bookmarks');
  }
}
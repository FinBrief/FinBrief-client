import { useQuery } from "@tanstack/react-query";
import { getUserTags } from "@/actions/userTags";
import { Tag } from "@/lib/types";

async function getTags(): Promise<Tag[]> {
  const data = await getUserTags();
  if ('perfferedTags' in data) {
    return data.perfferedTags;
  }
  return [];
}

export const useTags = () => {
  return useQuery({
    queryKey: ["tags"],
    queryFn: getTags,
    refetchOnWindowFocus: false,
    staleTime: Infinity
  });
}
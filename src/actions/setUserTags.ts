"use server"

import { getUser } from "@/actions/getUser";
import prisma from "@/utils/db/prisma";
import { Tag } from "@/lib/types";

export async function setUserTags(tags: Tag[]) {
  const user = await getUser();

  if (!user) {
    return { error: "User not found" };
  }

  await prisma.user.update({
    where: { 
      supabaseId: user.id 
    },
    data: { 
      perfferedTags: {
        set: tags.map(tag => ({id: tag.id}))
      }
    }
  });
}
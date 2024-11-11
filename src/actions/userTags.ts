"use server"

import { getUser } from "@/actions/getUser";
import prisma from "@/utils/db/prisma";
import { Tag } from "@/lib/types";


export async function getUserTags() {
  const user = await getUser();

  if (!user) {
    return { error: "User not found" };
  }

  const tags = await prisma.user.findUnique({
    where: { 
      supabaseId: user
    },
    select: { 
      perfferedTags: true 
    }
  });

  if (!tags ) {
    return { perfferedTags: [] };
  }

  return tags;
}


export async function setUserTags(tags: Tag[]) {
  const user = await getUser();

  if (!user) {
    return { error: "User not found" };
  }

  try {
    await prisma.user.update({
      where: { 
        supabaseId: user
      },
      data: { 
        perfferedTags: {
          set: tags.map(tag => ({id: tag.id}))
        }
      }
    });
    return { error: null };
  } catch (error) {
    console.error('Failed to update user tags:', error);
    return { error: "Failed to update tags" };
  }
}
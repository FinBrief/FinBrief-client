"use server"

import { getUserSession } from "@/actions/getUser";
import prisma from "@/utils/db/prisma";

export async function fetchUserBookmarks() {
  const user = await getUserSession();

  if (!user) {
    return { error: "User not found" };
  }

  try {
    const bookmarks = await prisma.user.findUnique({
      where: { 
        supabaseId: user.id 
      },
      select: {
        savedPosts: {
          select: {
            id: true
          }
        }
      }
    });
  
    if (!bookmarks) {
      return { savedPosts: [] };
    }
    return bookmarks;
  } catch (error) {
    console.log(error);
    return { error: "Failed to fetch bookmarks" };
  }
}

export async function setUserBookmark(postId: string) {
  const user = await getUserSession();

  if (!user) {
    return { error: "User not found" };
  }

  try {
    await prisma.user.update({
      where: { 
        supabaseId: user.id 
      },
      data: { 
        savedPosts: {
          connect: {
            id: postId
          }
        }
      }
    });
    return { success: true};
  } catch (error) {
    console.log(error);
    return { success: false };
  }
}

export async function removeUserBookmark(postId: string) {
  const user = await getUserSession();

  if (!user) {
    return { error: "User not found" };
  }

  try {
    await prisma.user.update({
      where: { 
        supabaseId: user.id 
      },
      data: {
        savedPosts: {
          disconnect: {
            id: postId
          }
        }
      }
    });
    return { success: true };
  } catch (error) {
    console.log(error);
    return { success: false };
  }
}

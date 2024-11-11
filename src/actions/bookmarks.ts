"use server"

import { getUser } from "@/actions/getUser";
import prisma from "@/utils/db/prisma";

export async function fetchUserBookmarks() {
  const user = await getUser();

  if (!user) {
    return { error: "User not found" };
  }

  try {
    const bookmarks = await prisma.user.findUnique({
      where: { 
        supabaseId: user
      },
      select: {
        savedPosts: {
          include: {
            tags: true,
            source: true
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
    return { error: "Failed to fetch user bookmarks" };
  }
}

export async function setUserBookmark(postId: string) {
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
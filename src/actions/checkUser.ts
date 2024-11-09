'use server'

import prisma from '@/utils/db/prisma'
import { currentUser } from '@clerk/nextjs/server'

export async function checkUser() {
  const user = await currentUser()

  if (!user) {
    return { error: 'No user data received from Clerk' };
  }

  const userDB = await prisma.user.findUnique({
    where: { supabaseId: user.id }
  })

  if (!userDB) {
    const supabaseId = user.id

    await prisma.user.create({
      data: {
        supabaseId: supabaseId,
        email: user.emailAddresses[0].emailAddress,
        username: user.username || ''
      }
    })

    return { error: null }
  }

  return { error: null, user: userDB }
}

//TODO: add error handling
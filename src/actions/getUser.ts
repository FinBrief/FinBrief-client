"use server"

import { auth } from "@clerk/nextjs/server"

export async function getUser() {
  const { userId } = await auth()
  if (!userId) {
    return null
  }
  return userId
}


/*import { createClient } from "@/utils/supabase/server"

export async function getUser() {
  const supabase = createClient()
  const { data, error } = await supabase.auth.getUser()

  if (error) {
    console.log('Supabase getUser Error:', error.message)
    return null
  }

  const userData = {
    id: data.user?.id,
    email: data.user?.email,
    username: data.user?.user_metadata.username
  }

  return userData
}

export async function getUserSession() {
  const supabase = createClient()
  const { data, error } = await supabase.auth.getSession()

  if (error) {
    console.log('Supabase getUserSession Error:', error.message)
    return null
  }

  const userData = {
    id: data.session?.user.id,
    email: data.session?.user.email,
    username: data.session?.user.user_metadata.username
  }

  return userData
}*/



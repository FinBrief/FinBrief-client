"use server"

import { createClient } from "@/utils/supabase/server"

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

  console.log(userData)
  console.log("............")

  return data.user
}

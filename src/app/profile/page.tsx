import { redirect } from 'next/navigation'
import { createClient } from '@/utils/supabase/server'
import ProfilePage from '@/components/profile/profilePage'

export default async function Profile() {
  const supabase = createClient();

  const { data, error } = await supabase.auth.getUser();

  if (error) {
    console.error('Supabase getUser Error:', error.message);
    return redirect("/login");
  }

  if (!data) {
    return redirect("/login");
  }

  const userData: { 
    id: string | undefined, 
    email: string | undefined, 
    username: string | undefined 
  } = {
    id: data.user.id,
    email: data.user.email,
    username: data.user.user_metadata.username
  }

  return (
    <>
      <ProfilePage params={userData} />
    </>
  )
}
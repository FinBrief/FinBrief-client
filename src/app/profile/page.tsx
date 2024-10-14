import { redirect } from 'next/navigation'
import { createClient } from '@/utils/supabase/server'
import ProfilePage from '@/components/profile/profilePage'

export default async function Profile() {
  /*const supabase = createClient();

  const {
    data: { user },
    error
  } = await supabase.auth.getUser();

  if (error) {
    console.error('Supabase getUser Error:', error.message);
    return redirect("/login");
  }

  if (!user) {
    return redirect("/login");
  }*/

  const userData: { 
    id: string | undefined, 
    email: string | undefined, 
    username: string | undefined 
  } = {
    id: "123",
    email: "test@test.com",
    username: "User"
  }

  return (
    <>
      <ProfilePage params={userData} />
    </>
  )
}
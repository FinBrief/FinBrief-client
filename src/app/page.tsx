import LandingPage from "@/components/landingPage";
import { createClient } from "@/utils/supabase/server";

export default async function Home() {
  const supabase = createClient();

  let loggedIn = false;

  const { data } = await supabase.auth.getSession();

  if (data.session) {
    loggedIn = true;
  } else {
    loggedIn = false;
  }

  return (
    <>
      <LandingPage loggedIn={loggedIn} />
    </>
  );
}

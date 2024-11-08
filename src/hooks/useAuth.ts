import { createClient } from "@/utils/supabase/client";
import { toast } from "sonner";
import { useState, useEffect } from "react";

type UserData = {
  id: string;
  email: string | undefined;
  username: string;
} | null;

export function useAuth() {
  const [userData, setUserData] = useState<UserData>(null);

  useEffect(() => {
    async function fetchUser() {
      const supabase = createClient();
      const { data, error } = await supabase.auth.getSession();

      if (error) {
        toast.error("Error authenticating");
        setUserData(null);
        return;
      }

      if (!data.session) {
        setUserData(null);
        return;
      }

      setUserData({
        id: data.session.user.id,
        email: data.session.user.email,
        username: data.session.user.user_metadata.username
      });
    }

    fetchUser();
  }, []);

  return { data: userData };
}
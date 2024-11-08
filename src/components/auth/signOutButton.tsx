"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { signOut } from "@/actions/userAuth"
import { toast } from "sonner";
import { redirect } from "next/navigation";

export default function SignOutButton() {
  const [isLoading, setIsLoading] = useState(false);

  const handleSignOut = async () => {
    setIsLoading(true);
    const success = await signOut();
    setIsLoading(false);
    if (!success) {
      toast.error("Error signing out");
    } else {
      toast.success("Signed out");
    }
  }

  return (
    <Button onClick={() => handleSignOut()} disabled={isLoading}>
      {isLoading ? "Signing out..." : "SignOut"}
    </Button>
  )
}

import { Button } from "@/components/ui/button"
import { signOut } from "@/actions/userAuth"

export default function SignOutButton() {
  return (
    <Button variant="secondary" size="lg" onClick={() => signOut()}>SignOut</Button>
  )
}

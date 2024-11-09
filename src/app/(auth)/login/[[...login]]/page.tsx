import { SignIn } from "@clerk/nextjs";

export default function LoginPage() {
  return (
    <div className="flex justify-center items-center h-screen">
      <SignIn />
    </div>
  )
}


/*import LoginForm from "@/components/auth/loginForm";

export default function LoginPage() {
  return (
    <div className="flex justify-center items-center h-screen">
      <LoginForm />
    </div>
  );
}*/

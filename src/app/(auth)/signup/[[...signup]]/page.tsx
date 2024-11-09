import { SignUp } from '@clerk/nextjs'

export default function SignUpPage() {
  return (
    <div className="flex justify-center items-center h-screen">
      <SignUp />
    </div>
  )
}


/*import SignUpForm  from "@/components/auth/signUpForm";

export default function SignUpPage() {
  return (
    <div className="flex justify-center items-center h-screen">
      <SignUpForm />
    </div>
  );
}*/

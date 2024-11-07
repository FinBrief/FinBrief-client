import { Separator } from "@/components/ui/separator"

export default function Footer() {
    return (
    <footer className="w-full z-20 py-6 mt-10 text-sm text-center bg-background text-muted-foreground">
      <Separator />
      <div className="flex flex-col justify-center items-start mt-2 p-4 space-y-6">
        <div id="login" className="font-bold text-base">
          FinBrief.
        </div>
        <a href="/privacy-policy.html" target="_blank" className="underline">
          Privacy Policy
        </a>
        <a href="https://github.com/FinBrief" target="_blank" className="underline">
          GitHub
        </a>
      </div>
    </footer>
  )
}
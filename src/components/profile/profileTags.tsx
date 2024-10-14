import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

export default function ProfileTags() {
  return (
    <div className="flex flex-col items-start w-full gap-6">
      <Card className="w-full max-w-3xl">
        <CardHeader>
          <CardTitle>Your subscribed topics</CardTitle>
          <CardDescription>
            Customize your tags which you want to see in your feed.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
            <div> Stocks </div>
            <div> Crypto </div>
            <div> AI </div>
            <div> Web3 </div>
            <div> Startups </div>
            <div> Venture Capital </div>
            <div> Investing </div>
            <div> Trading </div>
            <div> Finance </div>
          </div>
        </CardContent>
        <CardFooter>
          <Button variant="secondary">Save</Button>
        </CardFooter>
      </Card>
    </div>
  )
}
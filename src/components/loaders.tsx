import { Skeleton } from "@/components/ui/skeleton"

export function ProfileLoader() {
  return (
    <div className="flex flex-col space-y-8 mt-8">
      <div className="flex flex-col space-y-3">
        <Skeleton className="h-[125px] w-[250px] rounded-xl" />
        <div className="space-y-2">
          <Skeleton className="h-4 w-[250px]" />
          <Skeleton className="h-4 w-[200px]" />
        </div>
      </div>
      <div className="flex items-center space-x-4 mt-6">
        <Skeleton className="h-12 w-12 rounded-full" />
        <div className="space-y-2">
          <Skeleton className="h-4 w-[250px]" />
          <Skeleton className="h-4 w-[200px]" />
        </div>
      </div>
      <div className="flex flex-col space-y-3">
        <Skeleton className="h-[125px] w-[250px] rounded-xl" />
        <div className="space-y-2">
          <Skeleton className="h-4 w-[250px]" />
          <Skeleton className="h-4 w-[200px]" />
        </div>
      </div>
    </div>
  )  
}

export function PostLoader() {
  return (
    <div className="grid grid-cols-1 gap-6 min-[550px]:grid-cols-2 lg:grid-cols-3 w-full">
      {Array.from({ length: 9 }).map((_, index) => (
        <div className="flex flex-col justify-between p-4 gap-4 border border-zinc-800 rounded-xl" key={index}>
          <div className="space-y-2">
            <Skeleton className="h-4 w-3/4" />
            <Skeleton className="h-4 w-1/2" />
          </div>
          <Skeleton className="h-[200px] w-3/4 rounded-xl" />
        </div>
      ))}
    </div>
  )  
}


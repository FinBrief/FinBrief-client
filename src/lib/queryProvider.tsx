'use client'

import { useState } from 'react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

export function ReactQueryProvider({ children }: { children: React.ReactNode }) {
  const [queryClient] = useState(
      () => 
        new QueryClient({
          defaultOptions: {
            queries: {
              staleTime: 1000 * 60 * 60 * 3, // 3 hours
            },
          },
        })
  )

  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  )
}
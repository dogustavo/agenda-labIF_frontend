'use client'
import {
  QueryClient,
  QueryClientProvider
} from '@tanstack/react-query'

import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { useState } from 'react'

export default function ReactQueryProvider({
  children
}: {
  children: React.ReactNode
}) {
  const [queryClient] = useState(new QueryClient())

  return (
    // Provide the client to your App
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools
        buttonPosition="bottom-left"
        initialIsOpen={false}
      />
      {children}
    </QueryClientProvider>
  )
}

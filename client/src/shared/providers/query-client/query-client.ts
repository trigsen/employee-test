import { QueryCache, QueryClient } from '@tanstack/react-query'

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      staleTime: 5000
    }
  },
  queryCache: new QueryCache({})
})

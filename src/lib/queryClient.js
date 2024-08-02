// src/lib/queryClient.js
import { QueryClient } from '@tanstack/react-query';

// Create a new QueryClient instance
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      // By default, queries will be cached for 5 minutes and refetch every minute.
      staleTime: 5 * 60 * 1000,  // 5 minutes
      cacheTime: 10 * 60 * 1000, // 10 minutes
      refetchOnWindowFocus: true,
      refetchOnReconnect: true,
      refetchOnMount: true,
      retry: 3,  // Retry failed queries up to 3 times
    },
    mutations: {
      // By default, mutations will retry 3 times before failing
      retry: 3,
    },
  },
});

export default queryClient;

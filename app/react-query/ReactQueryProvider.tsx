// providers/react-query-provider.tsx
"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnReconnect: true,
      refetchOnWindowFocus: false,
      staleTime: 1000 * 60 * 5, // 5 นาที
      gcTime: 1000 * 60 * 3, // ลบออกจาก cache หลังจาก 10 นาที
      retry: 3,
    },
  },
});

const ReactQueryProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
};

export default ReactQueryProvider;

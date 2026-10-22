import "./index.css";
import { isAxiosError } from "axios";
import useAuth from "./contexts/useAuth";
import { routeTree } from "./routeTree.gen";
import { StrictMode, useEffect } from "react";
import { createRoot } from "react-dom/client";
import AuthProvider from "./contexts/Auth-Provider";
import { TooltipProvider } from "./components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { RouterProvider, createRouter } from "@tanstack/react-router";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { ThemeProvider } from "./contexts/Theme-Provider";

function isRetryableError(error: unknown): boolean {
  if (!isAxiosError(error) || !error.response) {
    // network errors or timeouts — retryable
    return true;
  }

  const status = error.response.status;
  // retry on 408 (timeout), 429 (rate limit), and 5xx (server errors)
  return status === 408 || status === 429 || status >= 500;
}

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 2 * 60 * 1000,
      refetchOnWindowFocus: false,
      retry: (failureCount: number, error: unknown): boolean => {
        if (!isRetryableError(error)) return false;
        return failureCount < 3;
      },
    },
  },
});

const router = createRouter({
  routeTree,
  defaultPreload: false,
  scrollRestoration: true,
  context: {
    queryClient,
    auth: undefined!,
  },
});

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

function AuthenticatedRouter() {
  const auth = useAuth();

  // re-generate route when auth changes
  useEffect(() => {
    router.invalidate();
  }, [auth]);

  return <RouterProvider router={router} context={{ queryClient, auth }} />;
}

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <TooltipProvider>
        <QueryClientProvider client={queryClient}>
          <AuthProvider>
            <AuthenticatedRouter />
          </AuthProvider>
          <ReactQueryDevtools initialIsOpen={false} />
        </QueryClientProvider>
      </TooltipProvider>
    </ThemeProvider>
  </StrictMode>,
);

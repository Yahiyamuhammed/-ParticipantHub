// src/main.jsx
import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import router from "@/app/router";
import { AuthProvider } from "@/context/AuthContext";

import "@/index.css";

// Initialize the React Query Client
// We configure it to keep data fresh and retry failed fetches slightly less aggressively for mobile.
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false, // Prevents excessive refetching when switching apps on mobile
      retry: 2, // Retry failed requests twice before throwing error
    },
  },
});

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <RouterProvider router={router} />
      </AuthProvider>
    </QueryClientProvider>
  </React.StrictMode>
);
// src/app/router.jsx
import { createBrowserRouter } from "react-router-dom";
import App from "./app";
import AuthGuard from "@/components/common/AuthGuard";

import LandingPage from "@/pages/Landing";
import LoginPage from "@/pages/Login";
import DashboardPage from "@/pages/Dashboard";
import ExplorePage from "@/pages/Explore";
import ResultsPage from "@/pages/Results";
import NotFoundPage from "@/pages/NotFound";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { index: true, element: <LandingPage /> },
      { path: "login", element: <LoginPage /> },
      { path: "explore", element: <ExplorePage /> },
      { path: "results/:competitionId", element: <ResultsPage /> },
      { path: "*", element: <NotFoundPage /> },
      // Protected Route
      {
        path: "dashboard",
        element: (
          <AuthGuard>
            <DashboardPage />
          </AuthGuard>
        ),
      },
    ],
  },
]);

export default router;
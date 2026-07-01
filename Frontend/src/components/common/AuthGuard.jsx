// src/components/common/AuthGuard.jsx
import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";

export default function AuthGuard({ children }) {
  const { user } = useAuth();
  const location = useLocation();

  if (!user) {
    // Redirect them to the /login page, but save the current location they were
    // trying to go to, in case we want to redirect them back later.
    return <Navigate to="/" state={{ from: location }} replace />;
  }

  return children;
}
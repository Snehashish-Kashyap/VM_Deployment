import React from "react";
import { Navigate } from "react-router-dom";

// ✅ This checks if the user is logged in
export default function PrivateRoute({ children }) {
  const token = localStorage.getItem("token");

  // If no token → redirect to login
  if (!token) {
    return <Navigate to="/login" replace />;
  }

  // Otherwise, show the protected page
  return children;
}

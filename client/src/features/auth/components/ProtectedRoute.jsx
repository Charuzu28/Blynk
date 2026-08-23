import {
  Navigate,
  Outlet,
} from "react-router-dom";

import { useAuth } from "../context/AuthContext";

const ProtectedRoute = () => {
  const {
    isAuthenticated,
    isLoading,
  } = useAuth();

  if (isLoading) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#F8FAFC]">
        <div className="text-center">
          <div
            className="
              mx-auto h-8 w-8
              animate-spin rounded-full
              border-2 border-slate-200
              border-t-blue-500
            "
            aria-hidden="true"
          />

          <p className="mt-4 text-sm text-slate-400">
            Loading your workspace...
          </p>
        </div>
      </main>
    );
  }

  if (!isAuthenticated) {
    return (
      <Navigate
        to="/login"
        replace
      />
    );
  }

  return <Outlet />;
};

export default ProtectedRoute;
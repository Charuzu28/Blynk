import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FiLogOut } from "react-icons/fi";

import { useAuth } from "../context/AuthContext";

const LogoutButton = () => {
  const navigate = useNavigate();

  const { logout } = useAuth();

  const [isLoggingOut, setIsLoggingOut] =
    useState(false);

  const [error, setError] =
    useState("");

  const handleLogout = async () => {
    if (isLoggingOut) {
      return;
    }

    try {
      setError("");
      setIsLoggingOut(true);

      await logout();

      navigate("/login", {
        replace: true,
      });
    } catch (error) {
      setError(
        error.message ||
          "Unable to log out. Please try again."
      );
    } finally {
      setIsLoggingOut(false);
    }
  };

  return (
    <div>
      {error && (
        <p
          role="alert"
          className="
            mb-3
            rounded-xl
            border border-red-100
            bg-red-50
            px-3 py-2
            text-sm
            text-red-600
          "
        >
          {error}
        </p>
      )}

      <button
        type="button"
        onClick={handleLogout}
        disabled={isLoggingOut}
        aria-busy={isLoggingOut}
        className="
          inline-flex
          w-full
          items-center
          justify-center
          gap-2

          rounded-2xl
          border border-red-100
          bg-red-50

          px-4 py-3

          text-sm
          font-medium
          text-red-600

          transition

          hover:bg-red-100

          disabled:cursor-not-allowed
          disabled:opacity-60

          sm:w-auto
        "
      >
        <FiLogOut size={17} />

        {isLoggingOut
          ? "Logging out..."
          : "Log out"}
      </button>
    </div>
  );
};

export default LogoutButton;
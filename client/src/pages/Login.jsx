import { useState } from "react";
import {
  Link,
  useNavigate,
} from "react-router-dom";

import AuthShell from "../features/auth/components/AuthShell";
import { useAuth } from "../features/auth/context/AuthContext";

const Login = () => {
  const navigate = useNavigate();

  const { login } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] =
    useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();

    setError("");

    if (!email.trim() || !password) {
      setError("Email and password are required.");
      return;
    }

    try {
      setIsSubmitting(true);

      await login({
        email: email.trim(),
        password,
      });

      navigate("/", {
        replace: true,
      });
    } catch (error) {
      setError(
        error.message ||
          "Unable to log in. Please try again."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <AuthShell
      title="Welcome back"
      description="Continue your focus sessions and keep building consistency."
    >
      <form
        onSubmit={handleSubmit}
        className="space-y-5"
      >
        {error && (
          <div
            role="alert"
            className="rounded-2xl border border-red-100 bg-red-50 px-4 py-3 text-sm text-red-600"
          >
            {error}
          </div>
        )}

        <div>
          <label
            htmlFor="email"
            className="mb-2 block text-sm font-medium text-slate-700"
          >
            Email
          </label>

          <input
            id="email"
            type="email"
            autoComplete="email"
            value={email}
            onChange={(event) =>
              setEmail(event.target.value)
            }
            placeholder="you@example.com"
            className="
              w-full rounded-2xl
              border border-slate-200
              bg-white px-4 py-3
              text-sm text-slate-800
              outline-none transition
              placeholder:text-slate-300
              focus:border-blue-400
              focus:ring-4 focus:ring-blue-50
            "
          />
        </div>

        <div>
          <label
            htmlFor="password"
            className="mb-2 block text-sm font-medium text-slate-700"
          >
            Password
          </label>

          <input
            id="password"
            type="password"
            autoComplete="current-password"
            value={password}
            onChange={(event) =>
              setPassword(event.target.value)
            }
            placeholder="Enter your password"
            className="
              w-full rounded-2xl
              border border-slate-200
              bg-white px-4 py-3
              text-sm text-slate-800
              outline-none transition
              placeholder:text-slate-300
              focus:border-blue-400
              focus:ring-4 focus:ring-blue-50
            "
          />
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="
            flex w-full items-center justify-center
            rounded-2xl bg-blue-500
            px-4 py-3
            text-sm font-medium text-white
            transition
            hover:bg-blue-600
            disabled:cursor-not-allowed
            disabled:opacity-60
          "
        >
          {isSubmitting
            ? "Signing in..."
            : "Sign in"}
        </button>
      </form>

      <p className="mt-6 text-center text-sm text-slate-500">
        New to blynk?{" "}
        <Link
          to="/register"
          className="font-medium text-blue-500 hover:text-blue-600"
        >
          Create an account
        </Link>
      </p>
    </AuthShell>
  );
};

export default Login;
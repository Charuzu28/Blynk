import { useState } from "react";
import {
  Link,
  useNavigate,
} from "react-router-dom";

import AuthShell from "../features/auth/components/AuthShell";
import { useAuth } from "../features/auth/context/AuthContext";
import TermsModal from "../features/auth/components/TermsModal";

const Register = () => {
  const navigate = useNavigate();

  const { register } = useAuth();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] =
    useState("");
  const [hasAcceptedTerms, setHasAcceptedTerms] =
    useState(false);
  const [isTermsOpen, setIsTermsOpen] =
    useState(false);

  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] =
    useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();

    setError("");

    const normalizedName = name.trim();
    const normalizedEmail = email.trim();

    if (!normalizedName) {
      setError("Name is required.");
      return;
    }

    if (!normalizedEmail) {
      setError("Email is required.");
      return;
    }

    if (password.length < 8) {
      setError(
        "Password must be at least 8 characters."
      );
      return;
    }

    if (!hasAcceptedTerms) {
      setError("You must accept the terms and conditions.");
      return;
    }

    try {
      setIsSubmitting(true);

      await register({
        name: normalizedName,
        email: normalizedEmail,
        password,
      });

      navigate("/", {
        replace: true,
      });
    } catch (error) {
      setError(
        error.message ||
          "Unable to create your account."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <AuthShell
      title="Create your account"
      description="Start building focused, sustainable work sessions."
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
            htmlFor="name"
            className="mb-2 block text-sm font-medium text-slate-700"
          >
            Name
          </label>

          <input
            id="name"
            type="text"
            autoComplete="name"
            value={name}
            onChange={(event) =>
              setName(event.target.value)
            }
            placeholder="Your name"
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
            autoComplete="new-password"
            value={password}
            onChange={(event) =>
              setPassword(event.target.value)
            }
            placeholder="At least 8 characters"
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

          <p className="mt-2 text-xs text-slate-400">
            Use at least 8 characters.
          </p>
        </div>

        <label className="flex items-start gap-3 text-sm text-slate-500">
          <input
            type="checkbox"
            checked={hasAcceptedTerms}
            onChange={(event) =>
              setHasAcceptedTerms(event.target.checked)
            }
            className="mt-1 h-4 w-4 rounded border-slate-300 text-blue-500 focus:ring-blue-400"
          />
          <span>
            I agree to the{" "}
            <button
              type="button"
              onClick={() => setIsTermsOpen(true)}
              className="font-medium text-blue-500 hover:text-blue-600"
            >
              Terms and Conditions
            </button>
          </span>
        </label>

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
            ? "Creating account..."
            : "Create account"}
        </button>
      </form>

      <TermsModal
        open={isTermsOpen}
        onClose={() => setIsTermsOpen(false)}
      />

      <p className="mt-6 text-center text-sm text-slate-500">
        Already have an account?{" "}
        <Link
          to="/login"
          className="font-medium text-blue-500 hover:text-blue-600"
        >
          Sign in
        </Link>
      </p>
    </AuthShell>
  );
};

export default Register;
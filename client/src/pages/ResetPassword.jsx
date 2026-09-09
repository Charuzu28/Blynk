import { useState } from "react";
import { Link, useSearchParams } from "react-router-dom";

import AuthShell from "../features/auth/components/AuthShell";
import { resetPassword } from "../features/auth/services/auth.api";

const ResetPassword = () => {
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token") || "";
  const [password, setPassword] = useState("");
  const [confirmation, setConfirmation] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setMessage("");
    setError("");

    if (!token) {
      setError("This password reset link is invalid.");
      return;
    }

    if (password !== confirmation) {
      setError("Passwords do not match.");
      return;
    }

    try {
      setIsSubmitting(true);
      const data = await resetPassword({ token, password });
      setMessage(data.message);
      setPassword("");
      setConfirmation("");
    } catch (requestError) {
      setError(requestError.message || "Unable to reset your password.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <AuthShell
      title="Reset your password"
      description="Choose a new password for your Blynk account."
    >
      <form onSubmit={handleSubmit} className="space-y-5">
        {error && (
          <div role="alert" className="rounded-2xl border border-red-100 bg-red-50 px-4 py-3 text-sm text-red-600">
            {error}
          </div>
        )}

        {message && (
          <div role="status" className="rounded-2xl border border-blue-100 bg-blue-50 px-4 py-3 text-sm text-blue-600">
            {message} <Link to="/login" className="font-medium underline">Sign in.</Link>
          </div>
        )}

        <div>
          <label htmlFor="password" className="mb-2 block text-sm font-medium text-slate-700">
            New password
          </label>
          <input
            id="password"
            type="password"
            autoComplete="new-password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            placeholder="At least 8 characters"
            className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-800 outline-none transition placeholder:text-slate-300 focus:border-blue-400 focus:ring-4 focus:ring-blue-50"
          />
        </div>

        <div>
          <label htmlFor="confirmation" className="mb-2 block text-sm font-medium text-slate-700">
            Confirm new password
          </label>
          <input
            id="confirmation"
            type="password"
            autoComplete="new-password"
            value={confirmation}
            onChange={(event) => setConfirmation(event.target.value)}
            placeholder="Repeat your password"
            className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-800 outline-none transition placeholder:text-slate-300 focus:border-blue-400 focus:ring-4 focus:ring-blue-50"
          />
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="flex w-full items-center justify-center rounded-2xl bg-blue-500 px-4 py-3 text-sm font-medium text-white transition hover:bg-blue-600 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {isSubmitting ? "Resetting password..." : "Reset password"}
        </button>
      </form>
    </AuthShell>
  );
};

export default ResetPassword;
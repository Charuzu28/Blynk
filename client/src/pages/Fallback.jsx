import { Link } from "react-router-dom";

function Fallback() {
  return (
    <main className="min-h-screen flex items-center justify-center bg-gray-50 px-6">
      <div className="text-center">
        <p className="text-sm font-semibold text-indigo-600">
          404
        </p>

        <h1 className="mt-2 text-4xl font-bold tracking-tight text-gray-900">
          Page not found
        </h1>

        <p className="mt-4 text-gray-600">
          Sorry, we couldn't find the page you're looking for.
        </p>

        <Link
          to="/"
          className="mt-8 inline-flex rounded-lg bg-indigo-600 px-5 py-3 text-sm font-medium text-white transition hover:bg-indigo-700"
        >
          Back to home
        </Link>
      </div>
    </main>
  );
}

export default Fallback;


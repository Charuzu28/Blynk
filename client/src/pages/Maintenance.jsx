
function Maintenance() {
  return (
    <main className="min-h-screen flex items-center justify-center bg-gray-50 px-6">
      <div className="max-w-md text-center">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-indigo-100">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="h-8 w-8 text-indigo-600"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M11.42 15.17 17.25 9.34m0 0 1.414-1.414a2.121 2.121 0 0 0-3-3L14.25 6.34m3 3-1.5 1.5M6.75 17.25l1.5-1.5m0 0 5.25-5.25m-5.25 5.25-1.414 1.414a2.121 2.121 0 0 1-3-3L5.25 12.75m3 3 1.5-1.5"
            />
          </svg>
        </div>

        <h1 className="mt-6 text-3xl font-bold tracking-tight text-gray-900">
          We'll be back soon
        </h1>

        <p className="mt-4 text-gray-600">
          We're currently performing some maintenance and improvements.
          Please check back again shortly.
        </p>

        <p className="mt-6 text-sm text-gray-500">
          Thank you for your patience.
        </p>
      </div>
    </main>
  );
}

export default Maintenance;

import { Link } from "react-router-dom";

const AuthShell = ({
  title,
  description,
  children,
}) => {
  return (
    <main className="min-h-screen bg-[#F8FAFC] px-4 py-8 sm:px-6 lg:px-8">
      <div className="mx-auto grid min-h-[calc(100vh-4rem)] max-w-6xl items-center gap-8 lg:grid-cols-[1fr_0.9fr]">
        <section className="hidden lg:block">
          <Link
            to="/"
            className="flex items-baseline gap-2 text-blue-500"
          >
            <span className="text-3xl font-medium tracking-tight">
              blynk
            </span>
            <span className="text-xs font-medium tracking-normal text-slate-400">
              v 2.2
            </span>
          </Link>

          <div className="mt-16 max-w-lg">
            <span className="inline-flex rounded-full border border-blue-100 bg-blue-50 px-4 py-2 text-sm font-medium text-blue-600">
              Sustainable productivity
            </span>

            <h1 className="mt-6 text-5xl font-semibold leading-tight tracking-tight text-slate-800">
              Stay focused without forgetting your eyes.
            </h1>

            <p className="mt-5 max-w-md text-base leading-7 text-slate-500">
              Focus sessions, tasks, notes, eye-care reminders,
              and consistency tracking in one calm workspace.
            </p>

            <div className="mt-10 grid max-w-md grid-cols-3 gap-3">
              <div className="rounded-2xl border border-slate-100 bg-white p-4">
                <p className="text-sm font-medium text-slate-700">
                  Focus
                </p>
                <p className="mt-1 text-xs text-slate-400">
                  Pomodoro
                </p>
              </div>

              <div className="rounded-2xl border border-slate-100 bg-white p-4">
                <p className="text-sm font-medium text-slate-700">
                  Rest
                </p>
                <p className="mt-1 text-xs text-slate-400">
                  20-20-20
                </p>
              </div>

              <div className="rounded-2xl border border-slate-100 bg-white p-4">
                <p className="text-sm font-medium text-slate-700">
                  Repeat
                </p>
                <p className="mt-1 text-xs text-slate-400">
                  Build streaks
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="mx-auto w-full max-w-md">
          <div className="mb-8 lg:hidden">
            <Link
              to="/"
              className="flex items-baseline gap-2 text-blue-500"
            >
              <span className="text-3xl font-medium tracking-tight">
                blynk
              </span>
              <span className="text-xs font-medium tracking-normal text-slate-400">
                v 2.2
              </span>
            </Link>
          </div>

          <div className="rounded-[28px] border border-slate-100 bg-white p-6 shadow-sm sm:p-8">
            <div className="mb-8">
              <h1 className="text-2xl font-semibold tracking-tight text-slate-800">
                {title}
              </h1>

              <p className="mt-2 text-sm leading-6 text-slate-500">
                {description}
              </p>
            </div>

            {children}
          </div>
        </section>
      </div>
    </main>
  );
};

export default AuthShell;
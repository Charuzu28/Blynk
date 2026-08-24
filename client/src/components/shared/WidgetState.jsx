const WidgetState = ({
  title,
  message,
  type = "loading",
}) => {
  const isError = type === "error";

  return (
    <div
      className="
        flex min-h-[180px]
        items-center justify-center
        rounded-[28px]
        border border-slate-100
        bg-white p-6
        shadow-sm
      "
    >
      <div className="max-w-xs text-center">
        {type === "loading" && (
          <div
            className="
              mx-auto h-7 w-7
              animate-spin rounded-full
              border-2 border-slate-200
              border-t-blue-500
            "
            aria-hidden="true"
          />
        )}

        {isError && (
          <div
            className="
              mx-auto flex h-9 w-9
              items-center justify-center
              rounded-full bg-red-50
              text-sm font-semibold
              text-red-500
            "
            aria-hidden="true"
          >
            !
          </div>
        )}

        <p
          className={`
            ${type === "loading" ? "mt-4" : "mt-3"}
            text-sm font-medium text-slate-700
          `}
        >
          {title}
        </p>

        {message && (
          <p className="mt-1 text-xs leading-5 text-slate-400">
            {message}
          </p>
        )}
      </div>
    </div>
  );
};

export default WidgetState;
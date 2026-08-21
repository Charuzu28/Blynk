const TimerRing = ({
  timeLeft,
  duration,
  children,
}) => {
  const radius = 180;
  const circumference = 2 * Math.PI * radius;

  const progress =
    duration > 0
      ? Math.min(Math.max(timeLeft / duration, 0), 1)
      : 0;

  const dashOffset =
    circumference - progress * circumference;

  return (
    <div className="relative aspect-square w-full max-w-[430px]">
      <svg
        viewBox="0 0 400 400"
        className="h-full w-full -rotate-90"
        aria-hidden="true"
      >
        <circle
          cx="200"
          cy="200"
          r={radius}
          fill="transparent"
          stroke="#EEF2F7"
          strokeWidth="10"
        />

        <circle
          cx="200"
          cy="200"
          r={radius}
          fill="transparent"
          stroke="#3B82F6"
          strokeWidth="10"
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={dashOffset}
          className="transition-[stroke-dashoffset] duration-300 ease-linear"
        />
      </svg>

      <div className="absolute inset-0 flex items-center justify-center">
        {children}
      </div>
    </div>
  );
};

export default TimerRing;
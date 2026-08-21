import {
  useEffect,
  useState,
} from "react";

import {
  FiEye,
  FiX,
} from "react-icons/fi";



const EyeBreakModal = ({
  open,
  onClose,
  duration = 20,
}) => {

  const [
  secondsLeft,
  setSecondsLeft,
] = useState(duration);

  useEffect(() => {
    if (!open) {
      setSecondsLeft(duration);
      return;
    }

    const intervalId = window.setInterval(() => {
      setSecondsLeft((current) => {
        if (current <= 1) {
          window.clearInterval(intervalId);

          window.setTimeout(() => {
            onClose();
          }, 0);

          return 0;
        }

        return current - 1;
      });
    }, 1000);

    return () => {
      window.clearInterval(intervalId);
    };
  }, [
  open,
  onClose,
  duration,
]);

  if (!open) {
    return null;
  }

  return (
    <div
      className="
        fixed inset-0 z-50
        flex items-center justify-center
        bg-slate-950/30
        px-4
        backdrop-blur-sm
      "
    >
      <div
        className="
          relative w-full max-w-md
          rounded-[28px]
          bg-white
          p-8
          text-center
          shadow-2xl
        "
      >
        <button
          type="button"
          aria-label="Close eye break"
          onClick={onClose}
          className="
            absolute right-5 top-5
            flex h-9 w-9
            cursor-pointer
            items-center justify-center
            rounded-full
            text-slate-400
            transition
            hover:bg-slate-100
            hover:text-slate-700
          "
        >
          <FiX size={20} />
        </button>

        <div
          className="
            mx-auto flex
            h-16 w-16
            items-center justify-center
            rounded-full
            bg-blue-50
            text-blue-500
          "
        >
          <FiEye size={30} />
        </div>

        <p
          className="
            mt-6 text-sm
            font-medium uppercase
            tracking-[0.18em]
            text-blue-500
          "
        >
          Blynk Break
        </p>

        <h2
          className="
            mt-3 text-3xl
            font-semibold
            tracking-tight
            text-slate-800
          "
        >
          Rest your eyes
        </h2>

        <p
          className="
            mx-auto mt-3
            max-w-sm
            text-sm leading-6
            text-slate-500
          "
        >
          Look at something about 20 feet away
          for 20 seconds.
        </p>

        <div
          className="
            my-8 text-6xl
            font-semibold
            tracking-tight
            text-slate-800
          "
        >
          {secondsLeft}
        </div>

        <p className="text-xs text-slate-400">
          Your focus timer will continue in the
          background.
        </p>

        <button
          type="button"
          onClick={onClose}
          className="
            mt-7 cursor-pointer
            rounded-xl border
            border-slate-200
            px-6 py-3
            text-sm font-medium
            text-slate-600
            transition
            hover:bg-slate-50
          "
        >
          Skip
        </button>
      </div>
    </div>
  );
};

export default EyeBreakModal;
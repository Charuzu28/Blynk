import {
  FiClock,
  FiCoffee,
  FiSun,
} from "react-icons/fi";

import { TIMER_MODES } from "../timer.constants";

const modes = [
  {
    key: TIMER_MODES.POMODORO,
    label: "Pomodoro",
    icon: FiClock,
  },
  {
    key: TIMER_MODES.SHORT_BREAK,
    label: "Short Break",
    icon: FiCoffee,
  },
  {
    key: TIMER_MODES.LONG_BREAK,
    label: "Long Break",
    icon: FiSun,
  },
];

const ModeSelector = ({ mode, onChange }) => {
  return (
    <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
      {modes.map(({ key, label, icon: Icon }) => {
        const isActive = mode === key;

        return (
          <button
            key={key}
            type="button"
            onClick={() => onChange(key)}
            className={`
              flex items-center justify-center gap-2
              rounded-xl border px-4 py-3
              text-sm font-medium
              transition-all duration-200
              cursor-pointer

              ${
                isActive
                  ? "border-blue-500 bg-blue-500 text-white shadow-sm"
                  : "border-slate-200 bg-white text-slate-600 hover:border-blue-200 hover:bg-blue-50"
              }
            `}
          >
            <Icon size={18} />

            {label}
          </button>
        );
      })}
    </div>
  );
};

export default ModeSelector;
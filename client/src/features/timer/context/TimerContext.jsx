import {
  createContext,
  useContext,
  useMemo,
} from "react";

import { useSettings } from "../../settings/context/SettingContext";

import usePomodoroTimer from "../hooks/usePomodoro";

import {
  TIMER_MODES,
} from "../timer.constants";

const TimerContext = createContext(null);

export const TimerProvider = ({
  children,
  onComplete,
}) => {
  const { settings } = useSettings();

  const timerDurations = useMemo(
    () => ({
      [TIMER_MODES.POMODORO]:
        settings.pomodoroMinutes * 60,

      [TIMER_MODES.SHORT_BREAK]:
        settings.shortBreakMinutes * 60,

      [TIMER_MODES.LONG_BREAK]:
        settings.longBreakMinutes * 60,
    }),
    [
      settings.pomodoroMinutes,
      settings.shortBreakMinutes,
      settings.longBreakMinutes,
    ]
  );

  const timer = usePomodoroTimer({
    onComplete,
    durations: timerDurations,
  });

  const value = useMemo(
    () => ({
      ...timer,
    }),
    [timer]
  );

  return (
    <TimerContext.Provider value={value}>
      {children}
    </TimerContext.Provider>
  );
};

export const useTimer = () => {
  const context = useContext(TimerContext);

  if (!context) {
    throw new Error(
      "useTimer must be used inside TimerProvider"
    );
  }

  return context;
};

export default TimerProvider;
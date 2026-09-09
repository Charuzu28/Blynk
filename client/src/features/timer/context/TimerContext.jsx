import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useRef,
  useState,
} from "react";

import usePomodoroTimer from "../hooks/usePomodoro";
import { useSettings } from "../../settings/context/SettingContext";
import { TIMER_MODES } from "../timer.constants";

const TimerContext = createContext(null);

const TimerProvider = ({ children }) => {
  const { settings } = useSettings();
  const activeTaskRef = useRef(null);
  const completionHandlerRef = useRef(null);

  const [activeTask, setActiveTaskState] =
    useState(null);

  const setActiveTask = useCallback((task) => {
    const snapshot = task
      ? {
          id: task.id,
          title: task.title,
          completedPomodoros:
            task.completedPomodoros,
          estimatedPomodoros:
            task.estimatedPomodoros,
        }
      : null;

    activeTaskRef.current = snapshot;
    setActiveTaskState(snapshot);
  }, []);

  const clearActiveTask = useCallback(() => {
    activeTaskRef.current = null;
    setActiveTaskState(null);
  }, []);

  const durations = useMemo(
    () => ({
      [TIMER_MODES.POMODORO]:
        Math.max(1, Number(settings.pomodoroMinutes) || 25) * 60,
      [TIMER_MODES.SHORT_BREAK]:
        Math.max(1, Number(settings.shortBreakMinutes) || 5) * 60,
      [TIMER_MODES.LONG_BREAK]:
        Math.max(1, Number(settings.longBreakMinutes) || 10) * 60,
    }),
    [
      settings.pomodoroMinutes,
      settings.shortBreakMinutes,
      settings.longBreakMinutes,
    ]
  );

  const registerCompletionHandler = useCallback((handler) => {
    completionHandlerRef.current = handler;

    return () => {
      if (completionHandlerRef.current === handler) {
        completionHandlerRef.current = null;
      }
    };
  }, []);

  const handleTimerComplete = useCallback(
    ({ mode, duration }) => {
      completionHandlerRef.current?.({
        mode,
        duration,
        task: activeTaskRef.current,
      });

      // window.alert("Timer finished!");
    },
    []
  );

  const timer = usePomodoroTimer({
    onComplete: handleTimerComplete,
    durations,
  });

  const value = {
    ...timer,

    // IMPORTANT
    activeTask,
    setActiveTask,
    clearActiveTask,
    registerCompletionHandler,
  };

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
import { useEffect, useRef, useState } from "react";

import { TIMER_MODES } from "../../timer/timer.constants";

const useEyeCareReminder = ({
  mode,
  duration,
  timeLeft,
  isRunning,
  enabled = true,
  reminderIntervalSeconds = 20 * 60,
}) => {
  const [isEyeBreakOpen, setIsEyeBreakOpen] = useState(false);
  const lastReminderRef = useRef(0);

  const elapsed = duration - timeLeft;

  useEffect(() => {
    if (!enabled) {
      return;
    }

    if (mode !== TIMER_MODES.POMODORO) {
      return;
    }

    if (!isRunning) {
      return;
    }

    if (elapsed < reminderIntervalSeconds) {
      return;
    }

    const currentReminderThreshold =
      Math.floor(elapsed / reminderIntervalSeconds) *
      reminderIntervalSeconds;

    if (currentReminderThreshold > lastReminderRef.current) {
      lastReminderRef.current = currentReminderThreshold;
      setIsEyeBreakOpen(true);
    }
  }, [
    elapsed,
    isRunning,
    mode,
    enabled,
    reminderIntervalSeconds,
  ]);

  useEffect(() => {
    if (!enabled) {
      lastReminderRef.current = 0;
      setIsEyeBreakOpen(false);
    }
  }, [enabled]);

  useEffect(() => {
    lastReminderRef.current = 0;
    setIsEyeBreakOpen(false);
  }, [mode, duration]);

  const closeEyeBreak = () => {
    setIsEyeBreakOpen(false);
  };

  const resetEyeReminder = () => {
    lastReminderRef.current = 0;
    setIsEyeBreakOpen(false);
  };

  return {
    isEyeBreakOpen,
    closeEyeBreak,
    resetEyeReminder,
  };
};

export default useEyeCareReminder;
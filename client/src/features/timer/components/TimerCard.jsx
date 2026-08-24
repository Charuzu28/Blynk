import {
  useCallback,
  useEffect,
  useRef,
  useState,
  useMemo,
} from "react";

import { useSettings } from "../../settings/context/SettingContext";

import {
  FiChevronDown,
  FiEye,
  FiFileText,
  FiPause,
  FiPlay,
} from "react-icons/fi";

import TimerRing from "./TimerRing";
import ModeSelector from "./ModeSelector";

import usePomodoroTimer from "../hooks/usePomodoro";
import useEyeCareReminder from "../../eyecare/hooks/useEyeCareReminder";
import EyeBreakModal from "../../eyecare/components/EyeBreakModal";

import {
  TIMER_DURATIONS,
  TIMER_LABELS,
  TIMER_MODES,
} from "../timer.constants";

import AlertModal from "./AlertModal";
import {
  ALARM_SOUNDS,
} from "../../settings/alarm.constants";

const formatTime = (seconds) => {
  const minutes = Math.floor(seconds / 60)
    .toString()
    .padStart(2, "0");

  const remainingSeconds = (seconds % 60)
    .toString()
    .padStart(2, "0");

  return `${minutes}:${remainingSeconds}`;
};

const completionMessages = {
  [TIMER_MODES.POMODORO]: {
    title: "Pomodoro complete",
    message: "Great work. Time for a short break.",
  },

  [TIMER_MODES.SHORT_BREAK]: {
    title: "Short break complete",
    message: "Your break is over. Ready to focus again?",
  },

  [TIMER_MODES.LONG_BREAK]: {
    title: "Long break complete",
    message: "You're refreshed. Ready for another focus session?",
  },
};

const TimerCard = ({
  selectedTask,
  onFocusComplete,
}) => {
  const [modal, setModal] = useState({
    open: false,
    title: "",
    message: "",
  });

  const alarmRef = useRef(null);
  const activeTaskRef = useRef(null);

  // --------------------------------------------------
  // Settings
  // IMPORTANT: This must come before anything
  // that uses `settings`.
  // --------------------------------------------------
  const { settings } = useSettings();

  // --------------------------------------------------
  // Timer durations
  // IMPORTANT: This must come before usePomodoroTimer
  // --------------------------------------------------
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

  // --------------------------------------------------
  // Alarm setup
  // --------------------------------------------------
 useEffect(() => {
    const selectedAlarm =
      ALARM_SOUNDS[
        settings.alarmSound
      ] ?? ALARM_SOUNDS.default;

    const audio = new Audio(
      selectedAlarm.src
    );

    audio.volume =
      Math.min(
        Math.max(
          Number(
            settings.alarmVolume
          ) || 0,
          0
        ),
        100
      ) / 100;

    alarmRef.current = audio;

    return () => {
      audio.pause();
      audio.currentTime = 0;

      if (alarmRef.current === audio) {
        alarmRef.current = null;
      }
    };
  }, [
    settings.alarmSound,
    settings.alarmVolume,
  ]);

  // --------------------------------------------------
  // Timer completion
  // --------------------------------------------------
  const handleComplete = useCallback(
    ({
      mode: completedMode,
      duration: completedDuration,
    }) => {
      const message =
        completionMessages[completedMode] ??
        completionMessages[TIMER_MODES.POMODORO];

      // If a Pomodoro is complete, notify parent
      if (
        completedMode ===
        TIMER_MODES.POMODORO
      ) {
        onFocusComplete?.({
          task: activeTaskRef.current,
          duration: completedDuration,
        });
      }

      // Clear active task
      activeTaskRef.current = null;

      // Play alarm if enabled
      if (
        settings.soundEnabled &&
        alarmRef.current
      ) {
        alarmRef.current.currentTime = 0;

        alarmRef.current
          .play()
          .catch(() => {});
      }

      // Show completion modal
      setModal({
        open: true,
        title: message.title,
        message: message.message,
      });
    },
    [
      onFocusComplete,
      settings.soundEnabled,
    ]
  );

  // --------------------------------------------------
  // Pomodoro timer
  // --------------------------------------------------
  const {
    mode,
    timeLeft,
    duration,
    isRunning,
    reset,
    changeMode,
    toggleTimer,
  } = usePomodoroTimer({
    onComplete: handleComplete,
    durations: timerDurations,
  });

  // --------------------------------------------------
  // Timer toggle
  // --------------------------------------------------
  const handleTimerToggle = () => {
    const isFreshSession =
      !isRunning &&
      timeLeft === duration;

    if (isFreshSession) {
      activeTaskRef.current =
        selectedTask ?? null;
    }

    toggleTimer();
  };

  // --------------------------------------------------
  // Eye care reminder
  // --------------------------------------------------
  const {
    isEyeBreakOpen,
    closeEyeBreak,
    resetEyeReminder,
  } = useEyeCareReminder({
    mode,
    duration,
    timeLeft,
    isRunning,

    enabled:
      settings.eyeCareEnabled,

    reminderIntervalSeconds:
      settings.eyeReminderMinutes * 60,
  });

  // --------------------------------------------------
  // Close completion modal
  // --------------------------------------------------
  const closeModal = () => {
    if (alarmRef.current) {
      alarmRef.current.pause();
      alarmRef.current.currentTime = 0;
    }

    setModal((current) => ({
      ...current,
      open: false,
    }));
  };

  // --------------------------------------------------
  // Reset timer
  // --------------------------------------------------
  const handleReset = () => {
    activeTaskRef.current = null;

    reset();
    resetEyeReminder();
  };

  // --------------------------------------------------
  // Change timer mode
  // --------------------------------------------------
  const handleModeChange = (nextMode) => {
    activeTaskRef.current = null;

    resetEyeReminder();
    changeMode(nextMode);
  };

  return (
    <>
      <section
        className="
          flex h-full flex-col
          rounded-[28px]
          border border-slate-100
          bg-white
          p-5
          shadow-[0_10px_40px_rgba(15,23,42,0.06)]
          sm:p-7
        "
      >
        <div className="flex flex-1 flex-col items-center">
          <TimerRing
            timeLeft={timeLeft}
            duration={duration}
            style={settings.timerRingStyle}
          >
            <div className="flex flex-col items-center text-center">
              <div
                className="
                  mb-5 flex h-14 w-14
                  items-center justify-center
                  rounded-full bg-blue-50
                  text-blue-500
                "
              >
                <FiEye size={28} />
              </div>

              <p className="mb-2 text-sm font-medium text-slate-500">
                {TIMER_LABELS[mode]}
              </p>

              <h1
                className="
                  text-5xl font-semibold
                  tracking-tight text-slate-800
                  sm:text-6xl
                "
              >
                {formatTime(timeLeft)}
              </h1>

              <button
                type="button"
                onClick={handleTimerToggle}
                className="
                  mt-7 flex min-w-[180px]
                  cursor-pointer
                  items-center justify-center
                  gap-2 rounded-xl
                  bg-blue-500 px-8 py-3
                  font-medium text-white
                  shadow-sm
                  transition
                  hover:bg-blue-600
                "
              >
                {isRunning ? (
                  <>
                    <FiPause />
                    Pause
                  </>
                ) : (
                  <>
                    <FiPlay />
                    Start
                  </>
                )}
              </button>

              <button
                type="button"
                onClick={handleReset}
                className="
                  mt-3 cursor-pointer
                  px-4 py-2
                  text-sm font-medium
                  text-blue-500
                  transition
                  hover:text-blue-600
                "
              >
                Reset
              </button>
            </div>
          </TimerRing>
        </div>

        {/* Current Task */}
        <button
          type="button"
          className="
            mt-3 flex w-full
            items-center justify-between
            rounded-xl border border-slate-200
            bg-white px-4 py-3
            text-left
            transition
            hover:bg-slate-50
          "
        >
          <div className="flex min-w-0 items-center gap-3">
            <FiFileText className="shrink-0 text-slate-500" />

            <span
              className="
                truncate text-sm
                text-slate-600
              "
            >
              {selectedTask
                ? selectedTask.title
                : "No task selected"}
            </span>
          </div>

          <div className="flex items-center gap-3 text-sm text-slate-500">
            <span>
              {selectedTask
                ? `${selectedTask.completedPomodoros} / ${selectedTask.estimatedPomodoros}`
                : "0 / 0"}
            </span>

            <FiChevronDown />
          </div>
        </button>

        {/* Eye Care */}
        <div
          className="
            mt-4 flex items-center gap-4
            rounded-xl bg-blue-50
            px-4 py-4
          "
        >
          <div
            className="
              flex h-11 w-11 shrink-0
              items-center justify-center
              rounded-full border border-blue-100
              bg-white text-blue-500
            "
          >
            <FiEye size={21} />
          </div>

          <div className="min-w-0 flex-1">
            <p className="text-sm font-medium text-blue-600">
              20-20-20 Reminder
            </p>

            <p className="mt-1 text-xs leading-5 text-slate-500">
              {settings.eyeCareEnabled
                ? `Every ${settings.eyeReminderMinutes} mins, look away for ${settings.eyeBreakSeconds} seconds.`
                : "Eye-care reminders are currently disabled."}
            </p>
          </div>

          <span className="hidden text-xs font-medium text-blue-500 sm:block">
            Eye care
          </span>
        </div>

        {/* Mode Selector */}
        <div className="mt-5">
          <ModeSelector
            mode={mode}
            onChange={handleModeChange}
          />
        </div>
      </section>

      {/* Completion Alert */}
      <AlertModal
        open={modal.open}
        title={modal.title}
        message={modal.message}
        onClose={closeModal}
      />

      {/* Eye Break Modal */}
      <EyeBreakModal
        open={isEyeBreakOpen}
        onClose={closeEyeBreak}
        duration={settings.eyeBreakSeconds}
      />
    </>
  );
};

export default TimerCard;
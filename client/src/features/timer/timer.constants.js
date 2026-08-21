export const TIMER_MODES = {
  POMODORO: "pomodoro",
  SHORT_BREAK: "shortBreak",
  LONG_BREAK: "longBreak",
};

export const TIMER_DURATIONS = {
  [TIMER_MODES.POMODORO]: 25 * 60,
  [TIMER_MODES.SHORT_BREAK]: 5 * 60,
  [TIMER_MODES.LONG_BREAK]: 10 * 60,
};

export const TIMER_LABELS = {
  [TIMER_MODES.POMODORO]: "Focus Session",
  [TIMER_MODES.SHORT_BREAK]: "Short Break",
  [TIMER_MODES.LONG_BREAK]: "Long Break",
};
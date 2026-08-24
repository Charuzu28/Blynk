export const TIMER_RING_STYLES = {
  SOLID: "solid",
  DASHED: "dashed",
  DOTTED: "dotted",
  WAVY: "wavy",
  NONE: "none",
};

export const TIMER_RING_OPTIONS = [
  {
    id: TIMER_RING_STYLES.SOLID,
    label: "Solid",
    description: "Clean continuous progress ring.",
  },
  {
    id: TIMER_RING_STYLES.DASHED,
    label: "Dashed",
    description: "Broken progress segments.",
  },
  {
    id: TIMER_RING_STYLES.DOTTED,
    label: "Dotted",
    description: "Minimal rounded progress dots.",
  },
  {
    id: TIMER_RING_STYLES.WAVY,
    label: "Wavy",
    description: "A playful curved progress ring.",
  },
  {
    id: TIMER_RING_STYLES.NONE,
    label: "None",
    description: "Show only the timer.",
  },
];
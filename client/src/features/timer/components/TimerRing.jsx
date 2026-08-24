import { useId, useMemo } from "react";

import {
  TIMER_RING_STYLES,
} from "../timerRing.constants";

const createWavyCirclePath = ({
  center = 200,
  radius = 180,
  amplitude = 4,
  waves = 28,
  points = 240,
}) => {
  const commands = [];

  for (let index = 0; index <= points; index += 1) {
    const angle =
      (index / points) * Math.PI * 2;

    const waveOffset =
      Math.sin(angle * waves) *
      amplitude;

    const currentRadius =
      radius + waveOffset;

    const x =
      center +
      Math.cos(angle) *
        currentRadius;

    const y =
      center +
      Math.sin(angle) *
        currentRadius;

    commands.push(
      `${index === 0 ? "M" : "L"} ${x} ${y}`
    );
  }

  commands.push("Z");

  return commands.join(" ");
};

const TimerRing = ({
  timeLeft,
  duration,
  style = TIMER_RING_STYLES.SOLID,
  children,
}) => {
  const radius = 180;

  const progress =
    duration > 0
      ? Math.min(
          Math.max(
            timeLeft / duration,
            0
          ),
          1
        )
      : 0;

  const progressOffset =
    100 - progress * 100;

  const maskId = useId().replace(
    /:/g,
    ""
  );

  const progressMaskId =
    `timer-progress-${maskId}`;

  const wavyPath = useMemo(
    () =>
      createWavyCirclePath({
        center: 200,
        radius,
      }),
    []
  );

  const ringStyle =
    style === TIMER_RING_STYLES.DASHED
      ? {
          strokeDasharray: "18 12",
          strokeLinecap: "round",
        }
      : style === TIMER_RING_STYLES.DOTTED
        ? {
            strokeDasharray: "1 15",
            strokeLinecap: "round",
          }
        : {
            strokeDasharray: undefined,
            strokeLinecap: "round",
          };

  const showRing =
    style !== TIMER_RING_STYLES.NONE;

  const isWavy =
    style === TIMER_RING_STYLES.WAVY;

  return (
    <div className="relative aspect-square w-full max-w-[430px]">
      {showRing && (
        <svg
          viewBox="0 0 400 400"
          className="h-full w-full -rotate-90"
          aria-hidden="true"
        >
          <defs>
            <mask id={progressMaskId}>
              <circle
                cx="200"
                cy="200"
                r={radius}
                fill="transparent"
                stroke="white"
                strokeWidth="28"
                pathLength="100"
                strokeDasharray="100"
                strokeDashoffset={
                  progressOffset
                }
                strokeLinecap="butt"
                className="
                  transition-[stroke-dashoffset]
                  duration-300
                  ease-linear
                "
              />
            </mask>
          </defs>

          {isWavy ? (
            <>
              <path
                d={wavyPath}
                fill="transparent"
                stroke="#EEF2F7"
                strokeWidth="10"
                strokeLinecap="round"
                strokeLinejoin="round"
              />

              <path
                d={wavyPath}
                fill="transparent"
                stroke="#3B82F6"
                strokeWidth="10"
                strokeLinecap="round"
                strokeLinejoin="round"
                mask={`url(#${progressMaskId})`}
              />
            </>
          ) : (
            <>
              <circle
                cx="200"
                cy="200"
                r={radius}
                fill="transparent"
                stroke="#EEF2F7"
                strokeWidth="10"
                {...ringStyle}
              />

              <circle
                cx="200"
                cy="200"
                r={radius}
                fill="transparent"
                stroke="#3B82F6"
                strokeWidth="10"
                mask={`url(#${progressMaskId})`}
                {...ringStyle}
              />
            </>
          )}
        </svg>
      )}

      <div className="absolute inset-0 flex items-center justify-center">
        {children}
      </div>
    </div>
  );
};

export default TimerRing;
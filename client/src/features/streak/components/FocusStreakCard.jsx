import { useMemo } from "react";

import {
  FiActivity,
  FiClock,
} from "react-icons/fi";

import {
  buildDailyFocusMap,
  buildHeatmapWeeks,
  formatFocusTime,
  getCurrentStreak,
  getIntensityLevel,
  getWeeklyFocusSeconds,
} from "../utils/focusStreak";

const intensityClasses = {
  0: "bg-slate-100",
  1: "bg-blue-100",
  2: "bg-blue-200",
  3: "bg-blue-400",
  4: "bg-blue-500",
};

const formatTooltipDate = (
  date
) => {
  return date.toLocaleDateString(
    [],
    {
      month: "short",
      day: "numeric",
      year: "numeric",
    }
  );
};

const getMonthLabel = (
  week,
  previousWeek
) => {
  const month =
    week.weekStart.getMonth();

  const previousMonth =
    previousWeek?.weekStart.getMonth();

  if (
    previousWeek &&
    month === previousMonth
  ) {
    return "";
  }

  return week.weekStart.toLocaleDateString(
    [],
    {
      month: "short",
    }
  );
};

const FocusStreakCard = ({
  sessions,
}) => {
  const {
    weeks,
    streak,
    weeklyFocus,
  } = useMemo(() => {
    const dailyMap =
      buildDailyFocusMap(sessions);

    return {
      weeks:
        buildHeatmapWeeks(
          dailyMap
        ),

      streak:
        getCurrentStreak(
          dailyMap
        ),

      weeklyFocus:
        getWeeklyFocusSeconds(
          dailyMap
        ),
    };
  }, [sessions]);

  const streakMessage =
    streak === 0
      ? "Complete a focus session to begin your streak."
      : streak === 1
      ? "Nice start. Keep it going."
      : "Great consistency! Keep it up.";

  return (
    <section
      className="
        rounded-[28px]
        border border-slate-100
        bg-white
        p-5
        shadow-[0_10px_40px_rgba(15,23,42,0.05)]
        sm:p-6
      "
    >
      {/* Header */}
      <div
        className="
          flex flex-wrap
          items-center
          justify-between
          gap-4
        "
      >
        <div
          className="
            flex items-center gap-3
          "
        >
          <div
            className="
              flex h-9 w-9
              items-center
              justify-center
              rounded-xl
              bg-blue-50
              text-blue-500
            "
          >
            <FiActivity size={19} />
          </div>

          <div>
            <h2
              className="
                text-lg
                font-medium
                text-slate-800
              "
            >
              Focus Streak
            </h2>

            <p
              className="
                mt-0.5
                text-xs
                text-slate-400
              "
            >
              Your daily focus activity
            </p>
          </div>
        </div>

        <div className="text-right">
          <p
            className="
              text-xl
              font-semibold
              text-blue-500
            "
          >
            {streak}
          </p>

          <p
            className="
              text-xs
              text-slate-400
            "
          >
            {streak === 1
              ? "day streak"
              : "day streak"}
          </p>
        </div>
      </div>

      {/* Heatmap */}
      <div
        className="
          mt-7 overflow-x-auto
          pb-2
        "
      >
        <div className="min-w-max">
          {/* Months */}
          <div
            className="
              ml-9 flex gap-1.5
            "
          >
            {weeks.map(
              (week, index) => (
                <div
                  key={
                    week.weekStart
                      .toISOString()
                  }
                  className="
                    w-3.5
                    text-[10px]
                    text-slate-400
                  "
                >
                  {getMonthLabel(
                    week,
                    weeks[index - 1]
                  )}
                </div>
              )
            )}
          </div>

          <div
            className="
              mt-2 flex
              items-start gap-2
            "
          >
            {/* Weekday labels */}
            <div
              className="
                grid
                grid-rows-7
                gap-1.5
                text-[9px]
                text-slate-400
              "
            >
              <span className="h-3.5">
                Mon
              </span>

              <span className="h-3.5" />

              <span className="h-3.5">
                Wed
              </span>

              <span className="h-3.5" />

              <span className="h-3.5">
                Fri
              </span>

              <span className="h-3.5" />

              <span className="h-3.5">
                Sun
              </span>
            </div>

            {/* Contribution cells */}
            <div className="flex gap-1.5">
              {weeks.map((week) => (
                <div
                  key={
                    week.weekStart
                      .toISOString()
                  }
                  className="
                    flex flex-col
                    gap-1.5
                  "
                >
                  {week.days.map(
                    (day) => {
                      const intensity =
                        getIntensityLevel(
                          day.sessions
                        );

                      if (
                        day.isFuture
                      ) {
                        return (
                          <div
                            key={
                              day.key
                            }
                            className="
                              h-3.5
                              w-3.5
                              rounded-[4px]
                              bg-transparent
                            "
                          />
                        );
                      }

                      return (
                        <div
                          key={
                            day.key
                          }
                          title={`${formatTooltipDate(
                            day.date
                          )} — ${
                            day.sessions
                          } focus ${
                            day.sessions ===
                            1
                              ? "session"
                              : "sessions"
                          }`}
                          className={`
                            h-3.5
                            w-3.5
                            rounded-[4px]
                            transition
                            hover:ring-2
                            hover:ring-blue-200

                            ${
                              intensityClasses[
                                intensity
                              ]
                            }
                          `}
                        />
                      );
                    }
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Legend */}
          <div
            className="
              mt-4 flex
              items-center
              justify-end
              gap-1.5
              text-[10px]
              text-slate-400
            "
          >
            <span>Less</span>

            {[0, 1, 2, 3, 4].map(
              (level) => (
                <span
                  key={level}
                  className={`
                    h-3
                    w-3
                    rounded-[3px]

                    ${
                      intensityClasses[
                        level
                      ]
                    }
                  `}
                />
              )
            )}

            <span>More</span>
          </div>
        </div>
      </div>

      {/* Summary */}
      <div
        className="
          mt-5 flex
          flex-col gap-4
          border-t
          border-slate-100
          pt-5
          sm:flex-row
          sm:items-center
          sm:justify-between
        "
      >
        <div
          className="
            flex items-center
            gap-3
          "
        >
          <div
            className="
              flex h-9 w-9
              items-center
              justify-center
              rounded-full
              bg-blue-50
              text-blue-500
            "
          >
            <FiClock size={17} />
          </div>

          <div>
            <p
              className="
                text-sm
                font-medium
                text-slate-700
              "
            >
              {formatFocusTime(
                weeklyFocus
              )}
            </p>

            <p
              className="
                text-xs
                text-slate-400
              "
            >
              focused this week
            </p>
          </div>
        </div>

        <p
          className="
            text-xs
            text-slate-400
          "
        >
          {streakMessage}
        </p>
      </div>
    </section>
  );
};

export default FocusStreakCard;
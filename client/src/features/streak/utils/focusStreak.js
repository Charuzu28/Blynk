const WEEKS_TO_SHOW = 14;

export const getLocalDateKey = (value) => {
  const date = new Date(value);

  const year = date.getFullYear();

  const month = String(
    date.getMonth() + 1
  ).padStart(2, "0");

  const day = String(
    date.getDate()
  ).padStart(2, "0");

  return `${year}-${month}-${day}`;
};

const startOfDay = (date) => {
  const result = new Date(date);

  result.setHours(0, 0, 0, 0);

  return result;
};

const addDays = (date, amount) => {
  const result = new Date(date);

  result.setDate(
    result.getDate() + amount
  );

  return result;
};

const getMonday = (date) => {
  const result = startOfDay(date);

  const day = result.getDay();

  const difference =
    day === 0 ? -6 : 1 - day;

  result.setDate(
    result.getDate() + difference
  );

  return result;
};

export const buildDailyFocusMap = (
  sessions
) => {
  return sessions.reduce(
    (map, session) => {
      if (
        !session.completed ||
        session.type !== "pomodoro"
      ) {
        return map;
      }

      const key = getLocalDateKey(
        session.completedAt
      );

      if (!map[key]) {
        map[key] = {
          sessions: 0,
          seconds: 0,
        };
      }

      map[key].sessions += 1;

      map[key].seconds +=
        session.duration || 0;

      return map;
    },
    {}
  );
};

export const buildHeatmapWeeks = (
  dailyMap
) => {
  const today = startOfDay(new Date());

  const currentMonday =
    getMonday(today);

  const firstMonday = addDays(
    currentMonday,
    -(WEEKS_TO_SHOW - 1) * 7
  );

  return Array.from(
    { length: WEEKS_TO_SHOW },
    (_, weekIndex) => {
      const weekStart = addDays(
        firstMonday,
        weekIndex * 7
      );

      const days = Array.from(
        { length: 7 },
        (_, dayIndex) => {
          const date = addDays(
            weekStart,
            dayIndex
          );

          const key =
            getLocalDateKey(date);

          const activity =
            dailyMap[key] || {
              sessions: 0,
              seconds: 0,
            };

          return {
            date,
            key,
            ...activity,
            isFuture: date > today,
          };
        }
      );

      return {
        weekStart,
        days,
      };
    }
  );
};

export const getIntensityLevel = (
  sessionCount
) => {
  if (sessionCount <= 0) return 0;
  if (sessionCount === 1) return 1;
  if (sessionCount === 2) return 2;

  if (
    sessionCount === 3 ||
    sessionCount === 4
  ) {
    return 3;
  }

  return 4;
};

export const getCurrentStreak = (
  dailyMap
) => {
  const today = startOfDay(new Date());

  const todayKey =
    getLocalDateKey(today);

  const yesterday =
    addDays(today, -1);

  const yesterdayKey =
    getLocalDateKey(yesterday);

  let cursor;

  if (dailyMap[todayKey]) {
    cursor = today;
  } else if (dailyMap[yesterdayKey]) {
    cursor = yesterday;
  } else {
    return 0;
  }

  let streak = 0;

  while (true) {
    const key =
      getLocalDateKey(cursor);

    if (!dailyMap[key]) {
      break;
    }

    streak += 1;

    cursor = addDays(
      cursor,
      -1
    );
  }

  return streak;
};

export const getWeeklyFocusSeconds = (
  dailyMap
) => {
  const today = startOfDay(new Date());

  let total = 0;

  for (
    let offset = 0;
    offset < 7;
    offset += 1
  ) {
    const date = addDays(
      today,
      -offset
    );

    const key =
      getLocalDateKey(date);

    total +=
      dailyMap[key]?.seconds || 0;
  }

  return total;
};

export const formatFocusTime = (
  seconds
) => {
  const minutes = Math.floor(
    seconds / 60
  );

  if (minutes < 60) {
    return `${minutes} min`;
  }

  const hours = seconds / 3600;

  return `${hours.toFixed(1)} hours`;
};
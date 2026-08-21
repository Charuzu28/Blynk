import { useEffect, useMemo, useState } from "react";

const STORAGE_KEY = "blynk_focus_sessions_v2";

const createSessionId = () => crypto.randomUUID();

const useFocusSessions = () => {
  const [sessions, setSessions] = useState(() => {
    try {
      const savedSessions = localStorage.getItem(STORAGE_KEY);

      return savedSessions
        ? JSON.parse(savedSessions)
        : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify(sessions)
    );
  }, [sessions]);

  const recordFocusSession = ({
    taskId = null,
    taskTitle = null,
    duration,
  }) => {
    const session = {
      id: createSessionId(),

      type: "pomodoro",

      taskId,
      taskTitle,

      duration,

      completed: true,
      completedAt: new Date().toISOString(),
    };

    setSessions((currentSessions) => [
      session,
      ...currentSessions,
    ]);

    return session;
  };

  const completedSessions = useMemo(() => {
    return sessions.filter(
      (session) =>
        session.completed &&
        session.type === "pomodoro"
    );
  }, [sessions]);

  const totalFocusSeconds = useMemo(() => {
    return completedSessions.reduce(
      (total, session) =>
        total + session.duration,
      0
    );
  }, [completedSessions]);

  return {
    sessions,
    completedSessions,
    totalFocusSeconds,

    recordFocusSession,
  };
};

export default useFocusSessions;
import {
  useEffect,
  useMemo,
  useState,
} from "react";

import {
  createFocusSession,
  getFocusSessions,
} from "../services/focusSession.api";

const useFocusSessions = () => {
  const [sessions, setSessions] = useState([]);

  const [isLoading, setIsLoading] =
    useState(true);

  const [error, setError] = useState(null);

  useEffect(() => {
    let isMounted = true;

    const loadSessions = async () => {
      try {
        setError(null);

        const loadedSessions =
          await getFocusSessions();

        if (isMounted) {
          setSessions(loadedSessions);
        }
      } catch (error) {
        console.error(
          "Unable to load focus sessions:",
          error
        );

        if (isMounted) {
          setError(error.message);
        }
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    };

    loadSessions();

    return () => {
      isMounted = false;
    };
  }, []);

  const recordFocusSession = async ({
    taskId = null,
    taskTitle = null,
    duration,
  }) => {
    if (
      !Number.isInteger(duration) ||
      duration <= 0
    ) {
      return null;
    }

    try {
      setError(null);

      const session =
        await createFocusSession({
          taskId,
          taskTitle,
          duration,
        });

      setSessions((currentSessions) => [
        session,
        ...currentSessions,
      ]);

      return session;
    } catch (error) {
      console.error(
        "Unable to record focus session:",
        error
      );

      setError(error.message);

      return null;
    }
  };

  const sortedSessions = useMemo(() => {
    return [...sessions].sort(
      (a, b) =>
        new Date(b.completedAt) -
        new Date(a.completedAt)
    );
  }, [sessions]);

  return {
    sessions: sortedSessions,

    isLoading,
    error,

    recordFocusSession,
  };
};

export default useFocusSessions;
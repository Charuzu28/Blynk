import {
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";

import {
  TIMER_DURATIONS,
  TIMER_MODES,
} from "../timer.constants";

const usePomodoroTimer = ({
  onComplete,
  durations = TIMER_DURATIONS,
} = {}) => {
  const [mode, setMode] = useState(
    TIMER_MODES.POMODORO
  );

  const [timeLeft, setTimeLeft] =
    useState(
      durations[
        TIMER_MODES.POMODORO
      ]
    );

  const [isRunning, setIsRunning] =
    useState(false);

  const endAtRef = useRef(null);

  const completionHandledRef =
    useRef(false);

  const onCompleteRef =
    useRef(onComplete);

  const duration =
    durations[mode];

  useEffect(() => {
    onCompleteRef.current =
      onComplete;
  }, [onComplete]);

  useEffect(() => {
    if (
      !isRunning ||
      !endAtRef.current
    ) {
      return;
    }

    const intervalId =
      window.setInterval(() => {
        const remaining =
          Math.max(
            0,
            Math.ceil(
              (
                endAtRef.current -
                Date.now()
              ) / 1000
            )
          );

        setTimeLeft(remaining);

        if (remaining === 0) {
          window.clearInterval(
            intervalId
          );

          endAtRef.current =
            null;

          setIsRunning(false);

          if (
            !completionHandledRef.current
          ) {
            completionHandledRef.current =
              true;

            onCompleteRef.current?.({
              mode,
              duration,
            });
          }
        }
      }, 250);

    return () => {
      window.clearInterval(
        intervalId
      );
    };
  }, [
    isRunning,
    mode,
    duration,
  ]);

  /*
   * If settings change while the timer
   * isn't running, update the displayed
   * duration.
   */
  useEffect(() => {
    if (!isRunning) {
      setTimeLeft(duration);
    }
  }, [
    duration,
    isRunning,
  ]);

  const start = useCallback(() => {
    if (timeLeft <= 0) {
      return;
    }

    completionHandledRef.current =
      false;

    endAtRef.current =
      Date.now() +
      timeLeft * 1000;

    setIsRunning(true);
  }, [timeLeft]);

  const pause =
    useCallback(() => {
      if (endAtRef.current) {
        const remaining =
          Math.max(
            0,
            Math.ceil(
              (
                endAtRef.current -
                Date.now()
              ) / 1000
            )
          );

        setTimeLeft(
          remaining
        );
      }

      endAtRef.current =
        null;

      setIsRunning(false);
    }, []);

  const reset =
    useCallback(() => {
      endAtRef.current =
        null;

      completionHandledRef.current =
        false;

      setIsRunning(false);

      setTimeLeft(
        durations[mode]
      );
    }, [
      durations,
      mode,
    ]);

  const changeMode =
    useCallback(
      (nextMode) => {
        if (
          !durations[
            nextMode
          ]
        ) {
          return;
        }

        endAtRef.current =
          null;

        completionHandledRef.current =
          false;

        setIsRunning(false);

        setMode(nextMode);

        setTimeLeft(
          durations[
            nextMode
          ]
        );
      },
      [durations]
    );

  const toggleTimer =
    useCallback(() => {
      if (isRunning) {
        pause();
        return;
      }

      start();
    }, [
      isRunning,
      pause,
      start,
    ]);

  return {
    mode,
    timeLeft,
    duration,
    isRunning,

    start,
    pause,
    reset,
    changeMode,
    toggleTimer,
  };
};

export default usePomodoroTimer;
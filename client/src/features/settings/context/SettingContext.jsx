import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

import { DEFAULT_SETTINGS } from "../settings.constants";

import {
  getSettings,
  updateSettingsRequest,
} from "../services/settings.api";

import { useAuth } from "../../auth/context/AuthContext.jsx";

const SettingsContext = createContext(null);

export const SettingsProvider = ({
  children,
}) => {
  const {
    isAuthenticated,
    isLoading: isAuthLoading,
  } = useAuth();

  const [settings, setSettings] = useState(
    DEFAULT_SETTINGS
  );

  const [isLoading, setIsLoading] =
    useState(true);

  const [error, setError] = useState(null);

  /*
   * Load settings whenever the authenticated
   * user/session changes.
   */
  useEffect(() => {
    let isMounted = true;

    if (isAuthLoading) {
      return () => {
        isMounted = false;
      };
    }

    if (!isAuthenticated) {
      setSettings(DEFAULT_SETTINGS);
      setError(null);
      setIsLoading(false);

      return () => {
        isMounted = false;
      };
    }

    const loadSettings = async () => {
      try {
        setIsLoading(true);
        setError(null);

        const loadedSettings =
          await getSettings();

        if (isMounted) {
          setSettings({
            ...DEFAULT_SETTINGS,
            ...loadedSettings,
          });
        }
      } catch (error) {
        console.error(
          "Unable to load settings:",
          error
        );

        if (isMounted) {
          setSettings(DEFAULT_SETTINGS);
          setError(error.message);
        }
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    };

    loadSettings();

    return () => {
      isMounted = false;
    };
  }, [
    isAuthenticated,
    isAuthLoading,
  ]);

  const saveSettings = useCallback(
    async (nextSettings) => {
      const mergedSettings = {
        ...DEFAULT_SETTINGS,
        ...nextSettings,
      };

      /*
       * Keep the UI responsive while the
       * server persists the settings.
       */
      setSettings(mergedSettings);
      setError(null);

      try {
        const savedSettings =
          await updateSettingsRequest(
            mergedSettings
          );

        setSettings({
          ...DEFAULT_SETTINGS,
          ...savedSettings,
        });

        return savedSettings;
      } catch (error) {
        console.error(
          "Unable to save settings:",
          error
        );

        setError(error.message);

        /*
         * Reload the server version so the
         * client does not pretend an unsaved
         * change persisted.
         */
        try {
          const serverSettings =
            await getSettings();

          setSettings({
            ...DEFAULT_SETTINGS,
            ...serverSettings,
          });
        } catch {
          // Keep current state if recovery fails.
        }

        return null;
      }
    },
    []
  );

  const updateSettings = useCallback(
    async (partialSettings) => {
      let previousSettings;
      let nextSettings;

      setSettings((currentSettings) => {
        previousSettings = currentSettings;

        nextSettings = {
          ...currentSettings,
          ...partialSettings,
        };

        return nextSettings;
      });

      setError(null);

      try {
        const savedSettings =
          await updateSettingsRequest(
            partialSettings
          );

        /*
         * Merge the server response instead
         * of replacing potentially newer local
         * UI changes.
         */
        setSettings((currentSettings) => ({
          ...currentSettings,
          ...savedSettings,
        }));

        return savedSettings;
      } catch (error) {
        console.error(
          "Unable to update settings:",
          error
        );

        setError(error.message);

        /*
         * Refresh authoritative state rather
         * than leaving an unsaved preference.
         */
        try {
          const serverSettings =
            await getSettings();

          setSettings({
            ...DEFAULT_SETTINGS,
            ...serverSettings,
          });
        } catch {
          if (previousSettings) {
            setSettings(previousSettings);
          }
        }

        return null;
      }
    },
    []
  );

  const resetSettings = useCallback(
    async () => {
      setSettings(DEFAULT_SETTINGS);
      setError(null);

      try {
        const savedSettings =
          await updateSettingsRequest(
            DEFAULT_SETTINGS
          );

        setSettings({
          ...DEFAULT_SETTINGS,
          ...savedSettings,
        });

        return savedSettings;
      } catch (error) {
        console.error(
          "Unable to reset settings:",
          error
        );

        setError(error.message);

        try {
          const serverSettings =
            await getSettings();

          setSettings({
            ...DEFAULT_SETTINGS,
            ...serverSettings,
          });
        } catch {
          // Keep defaults if recovery also fails.
        }

        return null;
      }
    },
    []
  );

  const value = useMemo(
    () => ({
      settings,

      isLoading,
      error,

      saveSettings,
      updateSettings,
      resetSettings,
    }),
    [
      settings,
      isLoading,
      error,
      saveSettings,
      updateSettings,
      resetSettings,
    ]
  );

  return (
    <SettingsContext.Provider
      value={value}
    >
      {children}
    </SettingsContext.Provider>
  );
};

export const useSettings = () => {
  const context =
    useContext(SettingsContext);

  if (!context) {
    throw new Error(
      "useSettings must be used inside SettingsProvider"
    );
  }

  return context;
};
import {
  createContext,
  useContext,
  useMemo,
  useState,
} from "react";

import {
  DEFAULT_SETTINGS,
  SETTINGS_STORAGE_KEY,
} from "../settings.constants";

const SettingsContext = createContext(null);

const loadSettings = () => {
  try {
    const storedSettings =
      localStorage.getItem(
        SETTINGS_STORAGE_KEY
      );

    if (!storedSettings) {
      return DEFAULT_SETTINGS;
    }

    return {
      ...DEFAULT_SETTINGS,
      ...JSON.parse(storedSettings),
    };
  } catch {
    return DEFAULT_SETTINGS;
  }
};

export const SettingsProvider = ({
  children,
}) => {
  const [settings, setSettings] =
    useState(loadSettings);

  const saveSettings = (
    nextSettings
  ) => {
    const mergedSettings = {
      ...DEFAULT_SETTINGS,
      ...nextSettings,
    };

    setSettings(mergedSettings);

    localStorage.setItem(
      SETTINGS_STORAGE_KEY,
      JSON.stringify(
        mergedSettings
      )
    );
  };

  const updateSettings = (
    partialSettings
  ) => {
    setSettings(
      (currentSettings) => {
        const nextSettings = {
          ...currentSettings,
          ...partialSettings,
        };

        localStorage.setItem(
          SETTINGS_STORAGE_KEY,
          JSON.stringify(
            nextSettings
          )
        );

        return nextSettings;
      }
    );
  };

  const resetSettings = () => {
    setSettings(
      DEFAULT_SETTINGS
    );

    localStorage.setItem(
      SETTINGS_STORAGE_KEY,
      JSON.stringify(
        DEFAULT_SETTINGS
      )
    );
  };

  const value = useMemo(
    () => ({
      settings,
      saveSettings,
      updateSettings,
      resetSettings,
    }),
    [settings]
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
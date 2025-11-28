// src/pages/Settings.jsx
import React from "react";
import { useTheme } from "../context/ThemeContext";

const COLORS = [
  { name: "Blue", value: "blue", hex: "#3B82F6" },
  { name: "Red", value: "red", hex: "#EF4444" },
  { name: "Green", value: "green", hex: "#22C55E" },
  { name: "Purple", value: "purple", hex: "#A855F7" },
];

const Settings = () => {
  const { theme, setTheme, darkMode, setDarkMode } = useTheme();

  return (
    <main
      className={`max-w-xl mx-auto p-6 transition ${
        darkMode ? "text-white" : "text-black"
      }`}
    >
        <br />
      <h1 className="text-blue-500 text-3xl font-semibold mb-6">Settings</h1>

      {/* THEME COLOR */}
      <div className="mb-8">
        <p className="text-blue-500 text-lg font-medium mb-3">Theme Color</p>

        <div
          className={`grid grid-cols-4 gap-4 ${
            darkMode ? "opacity-40 pointer-events-none" : ""
          }`}
        >
          {COLORS.map((c) => (
            <button
              key={c.value}
              onClick={() => setTheme(c.value)}
              title={c.name}
              className={`w-full h-12 rounded-lg flex items-center justify-center border-2 transition-transform transform ${
                theme === c.value
                  ? "scale-105 border-black dark:border-white"
                  : "border-gray-200"
              }`}
              style={{ backgroundColor: c.hex }}
            >
              {theme === c.value ? (
                <span className="text-white font-semibold">✓</span>
              ) : null}
            </button>
          ))}
        </div>

        {darkMode && (
          <p className="mt-2 text-sm opacity-70">Disabled while Dark Mode is ON</p>
        )}
      </div>

      {/* DARK MODE **FUTURE DEVELOPMENT** */}
      {/* <div className="flex items-center justify-between mb-8">
        <p className="text-blue-500 text-lg font-medium">Dark Mode</p>

        <label className="relative inline-flex items-center cursor-pointer">
          <input
            type="checkbox"
            checked={darkMode}
            onChange={() => setDarkMode((prev) => !prev)}
            className="sr-only peer"
          />
          <div className="w-14 h-8 bg-gray-300 peer-focus:ring-2 rounded-full peer peer-checked:bg-blue-600 transition" />
          <span className="absolute left-1 top-1 w-6 h-6 bg-white rounded-full shadow transition peer-checked:translate-x-6" />
        </label>
      </div> */}

      {/* ABOUT */}
      <div className="mb-8">
        <p className="text-blue-500 text-lg font-medium">About</p>
        <div className="flex flex-col justify-between p-2">
          <p className="text-blue-500 text-2xl font-medium mb-2"> Give your eyes a rest will ya!</p>
          <p className="text-blue-500 text-lg font-light">Inspired by the 20 20 20 rule, this is a little reminder to look 20 feet away from your screen every 20 minutes. 
          <br/>
          <br />
          Keep your eyes healthy, reduce eye strain, prevent headaches and increase productivity.
          No need to stay on this tab, enable the browser notification or just listen out for the sound every 20 mins... </p>
        </div>
      </div>
    </main>
  );
};

export default Settings;

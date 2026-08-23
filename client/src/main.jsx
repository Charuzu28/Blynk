import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import "./index.css";

import App from "./App.jsx";

import { ThemeProvider } from "./context/ThemeContext.jsx";

import { AuthProvider } from "./features/auth/context/AuthContext.jsx";

import { SettingsProvider } from "./features/settings/context/SettingContext.jsx";

createRoot(
  document.getElementById("root")
).render(
  <StrictMode>
    <ThemeProvider>
      <AuthProvider>
        <SettingsProvider>
          <App />
        </SettingsProvider>
      </AuthProvider>
    </ThemeProvider>
  </StrictMode>
);
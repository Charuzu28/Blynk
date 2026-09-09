import {
  BrowserRouter,
  Route,
  Routes,
} from "react-router-dom";

import AppLayout from "./components/layout/AppLayout";
import TimerProvider from "./features/timer/context/TimerContext";
import ProtectedRoute from "./features/auth/components/ProtectedRoute";

import Home from "./pages/Home";
import Tasks from "./pages/Tasks";
import Notes from "./pages/Notes";
import Settings from "./pages/Settings";
import Fallback from "./pages/Fallback";
import Maintenance from "./pages/Maintenance";


import Login from "./pages/Login";
import Register from "./pages/Register";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";

const MAINTENANCE_MODE = false;

function App() {
  if (MAINTENANCE_MODE) {
    return <Maintenance />;
  }

  return (
    <BrowserRouter>
    <TimerProvider>
      <Routes>
        {/* Public routes */}
        <Route
          path="/login"
          element={<Login />}
        />

        <Route
          path="/register"
          element={<Register />}
        />

        <Route
          path="/forgot-password"
          element={<ForgotPassword />}
        />

        <Route
          path="/reset-password"
          element={<ResetPassword />}
        />

        {/* Protected application */}
        <Route element={<ProtectedRoute />}>
          <Route element={<AppLayout />}>
            <Route
              path="/"
              element={<Home />}
            />

            <Route
              path="/tasks"
              element={<Tasks />}
            />

            <Route
              path="/notes"
              element={<Notes />}
            />

            <Route
              path="/settings"
              element={<Settings />}
            />

            <Route
              path="*"
              element={<Fallback />}
            />
           </Route>
          </Route>
        </Routes>
      </TimerProvider>
    </BrowserRouter>
  );
}

export default App;
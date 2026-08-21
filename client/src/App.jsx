import {
  BrowserRouter,
  Route,
  Routes,
} from "react-router-dom";

import AppLayout from "./components/layout/AppLayout";

import Home from "./pages/Home";
import Tasks from "./pages/Tasks";
import Notes from "./pages/Notes";
import Settings from "./pages/Settings";
import Fallback from "./pages/Fallback"; 
import Maintenance from "./pages/Maintenance";

const MAINTENANCE_MODE = false;

function App() {

   if (MAINTENANCE_MODE) {
    return <Maintenance />;
  }

  return (
    <BrowserRouter>
      <Routes>
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

          <Route path="*" element={<Fallback />} />

        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
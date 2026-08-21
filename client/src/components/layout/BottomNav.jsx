import { NavLink } from "react-router-dom";

import {
  FiHome,
  FiCheckCircle,
  FiFileText,
  FiSettings,
} from "react-icons/fi";

const navItems = [
  {
    to: "/",
    label: "Home",
    icon: FiHome,
    end: true,
  },
  {
    to: "/tasks",
    label: "Tasks",
    icon: FiCheckCircle,
  },
  {
    to: "/notes",
    label: "Notes",
    icon: FiFileText,
  },
  {
    to: "/settings",
    label: "Settings",
    icon: FiSettings,
  },
];

const BottomNav = () => {
  return (
    <nav
      aria-label="Main navigation"
      className="
        fixed bottom-5 left-1/2 z-40
        -translate-x-1/2
      "
    >
      <div
        className="
          flex items-center gap-1
          rounded-2xl
          border border-slate-200/80
          bg-white/95
          p-1.5
          shadow-[0_12px_40px_rgba(15,23,42,0.12)]
          backdrop-blur-xl
        "
      >
        {navItems.map(
          ({
            to,
            label,
            icon: Icon,
            end,
          }) => (
            <NavLink
              key={to}
              to={to}
              end={end}
              className={({ isActive }) =>
                `
                  relative flex
                  min-w-[66px]
                  flex-col
                  items-center
                  justify-center
                  gap-1
                  rounded-xl
                  px-3 py-2
                  text-[11px]
                  font-medium
                  transition-all
                  duration-200
                  sm:min-w-[78px]

                  ${
                    isActive
                      ? "bg-blue-50 text-blue-500"
                      : "text-slate-400 hover:bg-slate-50 hover:text-slate-700"
                  }
                `
              }
            >
              {({ isActive }) => (
                <>
                  <Icon
                    size={19}
                    strokeWidth={
                      isActive
                        ? 2.3
                        : 1.8
                    }
                  />

                  <span>
                    {label}
                  </span>
                </>
              )}
            </NavLink>
          )
        )}
      </div>
    </nav>
  );
};

export default BottomNav;
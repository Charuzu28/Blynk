// Settings.jsx

import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import {
  FiArrowLeft,
  FiClock,
  FiEye,
  FiRefreshCcw,
  FiSave,
  FiVolume2,
} from "react-icons/fi";

import { useSettings } from "../features/settings/context/SettingContext";
import AccountSection from "../features/auth/components/AccountSection";

const NumberSetting = ({
  label,
  description,
  value,
  min,
  max,
  suffix,
  onChange,
}) => {
  return (
    <div className="group flex flex-col gap-4 border-b border-slate-100 py-5 last:border-b-0 sm:flex-row sm:items-center sm:justify-between">
      <div className="min-w-0">
        <p className="text-sm font-semibold text-slate-700">
          {label}
        </p>

        <p className="mt-1 max-w-xl text-xs leading-5 text-slate-400">
          {description}
        </p>
      </div>

      <div className="flex shrink-0 items-center gap-2">
        <div className="relative">
          <input
            type="number"
            min={min}
            max={max}
            value={value}
            onChange={(event) =>
              onChange(Number(event.target.value))
            }
            className="
              h-10 w-20 rounded-xl
              border border-slate-200
              bg-slate-50
              px-3
              text-center text-sm font-semibold
              text-slate-700
              outline-none
              transition-all
              hover:border-slate-300
              focus:border-blue-400
              focus:bg-white
              focus:ring-4
              focus:ring-blue-50
            "
          />
        </div>

        <span className="w-10 text-xs font-medium text-slate-400">
          {suffix}
        </span>
      </div>
    </div>
  );
};

const ToggleSetting = ({
  label,
  description,
  enabled,
  onChange,
}) => {
  return (
    <div className="flex items-start justify-between gap-6 border-b border-slate-100 py-5 last:border-b-0">
      <div className="min-w-0">
        <p className="text-sm font-semibold text-slate-700">
          {label}
        </p>

        <p className="mt-1 max-w-xl text-xs leading-5 text-slate-400">
          {description}
        </p>
      </div>

      <button
        type="button"
        role="switch"
        aria-checked={enabled}
        aria-label={label}
        onClick={() => onChange(!enabled)}
        className={`
          relative mt-0.5 h-7 w-12 shrink-0
          cursor-pointer rounded-full
          transition-all duration-200
          focus:outline-none
          focus:ring-4
          focus:ring-blue-100
          ${
            enabled
              ? "bg-blue-500"
              : "bg-slate-200"
          }
        `}
      >
        <span
          aria-hidden="true"
          className={`
            absolute left-1 top-1
            h-5 w-5 rounded-full
            bg-white shadow-sm
            transition-transform duration-200
            ${
              enabled
                ? "translate-x-5"
                : "translate-x-0"
            }
          `}
        />
      </button>
    </div>
  );
};

const SettingsSection = ({
  icon: Icon,
  title,
  description,
  children,
}) => {
  return (
    <section className="
      overflow-hidden
      rounded-3xl
      border border-slate-200/80
      bg-white
      shadow-[0_8px_30px_rgba(15,23,42,0.04)]
    ">
      <div className="
        flex items-start gap-4
        border-b border-slate-100
        bg-gradient-to-r
        from-white
        to-slate-50/50
        px-5 py-5
        sm:px-7 sm:py-6
      ">
        <div className="
          flex h-11 w-11 shrink-0
          items-center justify-center
          rounded-2xl
          bg-blue-50
          text-blue-500
        ">
          <Icon size={19} strokeWidth={2} />
        </div>

        <div className="min-w-0">
          <h2 className="
            text-base font-semibold
            text-slate-800
            sm:text-lg
          ">
            {title}
          </h2>

          <p className="
            mt-1 max-w-2xl
            text-xs leading-5
            text-slate-400
          ">
            {description}
          </p>
        </div>
      </div>

      <div className="px-5 sm:px-7">
        {children}
      </div>
    </section>
  );
};

const Settings = () => {
  const {
    settings,
    saveSettings,
    resetSettings,
  } = useSettings();

  const [form, setForm] = useState(settings);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    setForm(settings);
  }, [settings]);

  const updateField = (field, value) => {
    setSaved(false);

    setForm((currentForm) => ({
      ...currentForm,
      [field]: value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const sanitized = {
      ...form,

      pomodoroMinutes: Math.min(
        120,
        Math.max(1, Number(form.pomodoroMinutes) || 1)
      ),

      shortBreakMinutes: Math.min(
        30,
        Math.max(1, Number(form.shortBreakMinutes) || 1)
      ),

      longBreakMinutes: Math.min(
        60,
        Math.max(1, Number(form.longBreakMinutes) || 1)
      ),

      eyeReminderMinutes: Math.min(
        60,
        Math.max(1, Number(form.eyeReminderMinutes) || 1)
      ),

      eyeBreakSeconds: Math.min(
        120,
        Math.max(5, Number(form.eyeBreakSeconds) || 5)
      ),
    };

    saveSettings(sanitized);
    setForm(sanitized);
    setSaved(true);
  };

  const handleReset = () => {
    resetSettings();
    setSaved(false);
  };

  return (
    <main className="
      min-h-screen
      bg-[#F8FAFC]
      px-4 py-6
      pb-28
      sm:px-6 sm:py-8
      lg:px-8
    ">
      <div className="mx-auto max-w-4xl">

        {/* Header */}
        <header className="mb-7">
          <div className="flex items-center gap-4">
            <Link
              to="/"
              aria-label="Back home"
              className="
                flex h-10 w-10 shrink-0
                items-center justify-center
                rounded-full
                border border-slate-200
                bg-white
                text-slate-500
                shadow-sm
                transition
                hover:border-slate-300
                hover:bg-slate-50
                hover:text-slate-700
              "
            >
              <FiArrowLeft size={18} />
            </Link>

            <div>
              <h1 className="
                text-2xl font-bold
                tracking-tight
                text-slate-800
              ">
                Settings
              </h1>

              <p className="
                mt-1 text-sm
                text-slate-400
              ">
                Customize your focus experience.
              </p>
            </div>
          </div>
        </header>

        {/* Account */}
        <div className="mb-5">
          <AccountSection />
        </div>

        <form
          onSubmit={handleSubmit}
          className="space-y-5"
        >
          {/* Timer */}
          <SettingsSection
            icon={FiClock}
            title="Timer"
            description="Choose how long each focus and break session lasts."
          >
            <NumberSetting
              label="Pomodoro"
              description="Length of a focus session."
              value={form.pomodoroMinutes}
              min={1}
              max={120}
              suffix="min"
              onChange={(value) =>
                updateField(
                  "pomodoroMinutes",
                  value
                )
              }
            />

            <NumberSetting
              label="Short Break"
              description="A quick break between focus sessions."
              value={form.shortBreakMinutes}
              min={1}
              max={30}
              suffix="min"
              onChange={(value) =>
                updateField(
                  "shortBreakMinutes",
                  value
                )
              }
            />

            <NumberSetting
              label="Long Break"
              description="A longer recovery period between focus cycles."
              value={form.longBreakMinutes}
              min={1}
              max={60}
              suffix="min"
              onChange={(value) =>
                updateField(
                  "longBreakMinutes",
                  value
                )
              }
            />
          </SettingsSection>

          {/* Eye Care */}
          <SettingsSection
            icon={FiEye}
            title="Eye Care"
            description="Manage BLYNK'N's 20-20-20 eye-rest reminders."
          >
            <ToggleSetting
              label="Eye-care reminders"
              description="Remind me to look away from the screen during long focus sessions."
              enabled={form.eyeCareEnabled}
              onChange={(value) =>
                updateField(
                  "eyeCareEnabled",
                  value
                )
              }
            />

            {form.eyeCareEnabled && (
              <div className="
                animate-in
                fade-in
                slide-in-from-top-1
                duration-200
              ">
                <NumberSetting
                  label="Reminder interval"
                  description="How often BLYNK'N reminds you to rest your eyes."
                  value={form.eyeReminderMinutes}
                  min={1}
                  max={60}
                  suffix="min"
                  onChange={(value) =>
                    updateField(
                      "eyeReminderMinutes",
                      value
                    )
                  }
                />

                <NumberSetting
                  label="Eye break"
                  description="How long each eye-rest countdown lasts."
                  value={form.eyeBreakSeconds}
                  min={5}
                  max={120}
                  suffix="sec"
                  onChange={(value) =>
                    updateField(
                      "eyeBreakSeconds",
                      value
                    )
                  }
                />
              </div>
            )}
          </SettingsSection>

          {/* Sounds */}
          <SettingsSection
            icon={FiVolume2}
            title="Sounds"
            description="Control audio feedback when sessions end."
          >
            <ToggleSetting
              label="Timer alarm"
              description="Play a sound when a Pomodoro or break finishes."
              enabled={form.soundEnabled}
              onChange={(value) =>
                updateField(
                  "soundEnabled",
                  value
                )
              }
            />
          </SettingsSection>

          {/* Actions */}
          <div className="
            flex flex-col-reverse
            gap-3 pt-2
            sm:flex-row
            sm:items-center
            sm:justify-between
          ">
            <button
              type="button"
              onClick={handleReset}
              className="
                flex h-11
                items-center justify-center
                gap-2
                rounded-xl
                border border-slate-200
                bg-white
                px-5
                text-sm font-medium
                text-slate-500
                shadow-sm
                transition
                hover:border-slate-300
                hover:bg-slate-50
                hover:text-slate-700
              "
            >
              <FiRefreshCcw size={16} />
              Reset defaults
            </button>

            <div className="
              flex items-center
              justify-end gap-4
            ">
              {saved && (
                <span className="
                  text-sm font-medium
                  text-emerald-600
                ">
                  Settings saved
                </span>
              )}

              <button
                type="submit"
                className="
                  flex h-11
                  items-center justify-center
                  gap-2
                  rounded-xl
                  bg-blue-500
                  px-6
                  text-sm font-semibold
                  text-white
                  shadow-sm
                  shadow-blue-500/20
                  transition
                  hover:bg-blue-600
                  hover:shadow-md
                  hover:shadow-blue-500/20
                  focus:outline-none
                  focus:ring-4
                  focus:ring-blue-100
                "
              >
                <FiSave size={16} />
                Save Settings
              </button>
            </div>
          </div>
        </form>
      </div>
    </main>
  );
};

export default Settings;
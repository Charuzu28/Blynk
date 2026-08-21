import {
  useEffect,
  useState,
} from "react";

import { Link } from "react-router-dom";

import {
  FiArrowLeft,
  FiBell,
  FiClock,
  FiEye,
  FiRefreshCcw,
  FiSave,
  FiVolume2,
} from "react-icons/fi";

import { useSettings } from "../features/settings/context/SettingContext";

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
    <div
      className="
        flex flex-col gap-4
        border-b border-slate-100
        py-5
        sm:flex-row
        sm:items-center
        sm:justify-between
      "
    >
      <div>
        <p
          className="
            text-sm font-medium
            text-slate-700
          "
        >
          {label}
        </p>

        <p
          className="
            mt-1 text-xs
            text-slate-400
          "
        >
          {description}
        </p>
      </div>

      <div
        className="
          flex items-center gap-2
        "
      >
        <input
          type="number"
          min={min}
          max={max}
          value={value}
          onChange={(event) =>
            onChange(
              Number(
                event.target.value
              )
            )
          }
          className="
            w-20 rounded-xl
            border border-slate-200
            bg-white px-3 py-2
            text-center
            text-sm text-slate-700
            outline-none
            transition
            focus:border-blue-300
            focus:ring-2
            focus:ring-blue-50
          "
        />

        <span
          className="
            min-w-[45px]
            text-xs text-slate-400
          "
        >
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
    <div
      className="
        flex items-center
        justify-between
        gap-6
        border-b
        border-slate-100
        py-5
      "
    >
      <div>
        <p className="text-sm font-medium text-slate-700">
          {label}
        </p>

        <p
          className="
            mt-1 text-xs
            leading-5
            text-slate-400
          "
        >
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
          relative
          h-7 w-12
          shrink-0
          cursor-pointer
          rounded-full
          p-0
          transition-colors
          duration-200
          focus:outline-none
          focus:ring-2
          focus:ring-blue-200
          focus:ring-offset-2

          ${enabled ? "bg-blue-500" : "bg-slate-300"}
        `}
      >
        <span
          aria-hidden="true"
          className={`
            absolute
            left-1
            top-1
            h-5 w-5
            rounded-full
            bg-white
            shadow-sm
            transition-transform
            duration-200
            ease-in-out

            ${enabled ? "translate-x-5" : "translate-x-0"}
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
    <section
      className="
        rounded-[28px]
        border border-slate-100
        bg-white
        p-5
        shadow-[0_10px_40px_rgba(15,23,42,0.05)]
        sm:p-7
      "
    >
      <div
        className="
          flex items-start gap-3
        "
      >
        <div
          className="
            flex h-10 w-10
            shrink-0
            items-center
            justify-center
            rounded-xl
            bg-blue-50
            text-blue-500
          "
        >
          <Icon size={19} />
        </div>

        <div>
          <h2
            className="
              text-lg font-medium
              text-slate-800
            "
          >
            {title}
          </h2>

          <p
            className="
              mt-1 text-xs
              leading-5
              text-slate-400
            "
          >
            {description}
          </p>
        </div>
      </div>

      <div className="mt-4">
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

  const [form, setForm] =
    useState(settings);

  const [saved, setSaved] =
    useState(false);

  useEffect(() => {
    setForm(settings);
  }, [settings]);

  const updateField = (
    field,
    value
  ) => {
    setSaved(false);

    setForm(
      (currentForm) => ({
        ...currentForm,
        [field]: value,
      })
    );
  };

  const handleSubmit = (
    event
  ) => {
    event.preventDefault();

    const sanitized = {
      ...form,

      pomodoroMinutes:
        Math.min(
          120,
          Math.max(
            1,
            form.pomodoroMinutes
          )
        ),

      shortBreakMinutes:
        Math.min(
          30,
          Math.max(
            1,
            form.shortBreakMinutes
          )
        ),

      longBreakMinutes:
        Math.min(
          60,
          Math.max(
            1,
            form.longBreakMinutes
          )
        ),

      eyeReminderMinutes:
        Math.min(
          60,
          Math.max(
            1,
            form.eyeReminderMinutes
          )
        ),

      eyeBreakSeconds:
        Math.min(
          120,
          Math.max(
            5,
            form.eyeBreakSeconds
          )
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
    <main
      className="
        min-h-screen
        bg-[#F8FAFC]
        px-4 py-7
        pb-32
        sm:px-6
        lg:px-8
      "
    >
      <div
        className="
          mx-auto max-w-4xl
        "
      >
        <header
          className="
            mb-8
            flex items-center
            justify-between
          "
        >
          <div
            className="
              flex items-center
              gap-4
            "
          >
            <Link
              to="/"
              aria-label="Back home"
              className="
                flex h-10 w-10
                items-center
                justify-center
                rounded-full
                border border-slate-200
                bg-white
                text-slate-500
                transition
                hover:bg-slate-50
              "
            >
              <FiArrowLeft
                size={18}
              />
            </Link>

            <div>
              <h1
                className="
                  text-2xl
                  font-semibold
                  tracking-tight
                  text-slate-800
                "
              >
                Settings
              </h1>

              <p
                className="
                  mt-1 text-sm
                  text-slate-400
                "
              >
                Customize your
                focus experience.
              </p>
            </div>
          </div>
        </header>

        <form
          onSubmit={handleSubmit}
          className="space-y-5"
        >
          <SettingsSection
            icon={FiClock}
            title="Timer"
            description="Choose how long each focus and break session lasts."
          >
            <NumberSetting
              label="Pomodoro"
              description="Length of a focus session."
              value={
                form.pomodoroMinutes
              }
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
              value={
                form.shortBreakMinutes
              }
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
              description="A longer recovery period."
              value={
                form.longBreakMinutes
              }
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

          <SettingsSection
            icon={FiEye}
            title="Eye Care"
            description="Manage BLYNK'N's 20-20-20 eye-rest reminders."
          >
            <ToggleSetting
              label="Eye-care reminders"
              description="Remind me to look away from the screen during long focus sessions."
              enabled={
                form.eyeCareEnabled
              }
              onChange={(value) =>
                updateField(
                  "eyeCareEnabled",
                  value
                )
              }
            />

            {form.eyeCareEnabled && (
              <>
                <NumberSetting
                  label="Reminder interval"
                  description="How often BLYNK'N reminds you to rest your eyes."
                  value={
                    form.eyeReminderMinutes
                  }
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
                  value={
                    form.eyeBreakSeconds
                  }
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
              </>
            )}
          </SettingsSection>

          <SettingsSection
            icon={FiVolume2}
            title="Sounds"
            description="Control audio feedback when sessions end."
          >
            <ToggleSetting
              label="Timer alarm"
              description="Play a sound when a Pomodoro or break finishes."
              enabled={
                form.soundEnabled
              }
              onChange={(value) =>
                updateField(
                  "soundEnabled",
                  value
                )
              }
            />
          </SettingsSection>

          <div
            className="
              flex flex-col
              gap-3
              sm:flex-row
              sm:items-center
              sm:justify-between
            "
          >
            <button
              type="button"
              onClick={
                handleReset
              }
              className="
                flex cursor-pointer
                items-center
                justify-center
                gap-2
                rounded-xl
                border
                border-slate-200
                bg-white
                px-5 py-3
                text-sm
                font-medium
                text-slate-500
                transition
                hover:bg-slate-50
              "
            >
              <FiRefreshCcw />

              Reset defaults
            </button>

            <div
              className="
                flex items-center
                justify-end gap-4
              "
            >
              {saved && (
                <span
                  className="
                    text-sm
                    text-emerald-600
                  "
                >
                  Settings saved
                </span>
              )}

              <button
                type="submit"
                className="
                  flex cursor-pointer
                  items-center
                  justify-center
                  gap-2
                  rounded-xl
                  bg-blue-500
                  px-6 py-3
                  text-sm
                  font-medium
                  text-white
                  transition
                  hover:bg-blue-600
                "
              >
                <FiSave />

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
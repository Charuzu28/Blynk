import {
  useEffect,
  useRef,
  useState,
} from "react";

import { Link } from "react-router-dom";

import {
  FiArrowLeft,
  FiClock,
  FiEye,
  FiPlay,
  FiRefreshCcw,
  FiSave,
  FiSquare,
  FiVolume1,
  FiVolume2,
} from "react-icons/fi";

import {
  ALARM_SOUND_OPTIONS,
  ALARM_SOUNDS,
} from "../features/settings/alarm.constants";

import {
  TIMER_RING_OPTIONS,
} from "../features/timer/timerRing.constants";

import { useSettings } from "../features/settings/context/SettingContext";
import AccountSection from "../features/auth/components/AccountSection";
import WidgetState from "../components/shared/WidgetState";

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
            value={value ?? ""}
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
    <section
      className="
        overflow-hidden
        rounded-3xl
        border border-slate-200/80
        bg-white
        shadow-[0_8px_30px_rgba(15,23,42,0.04)]
      "
    >
      <div
        className="
          flex items-start gap-4
          border-b border-slate-100
          bg-gradient-to-r
          from-white
          to-slate-50/50
          px-5 py-5
          sm:px-7 sm:py-6
        "
      >
        <div
          className="
            flex h-11 w-11 shrink-0
            items-center justify-center
            rounded-2xl
            bg-blue-50
            text-blue-500
          "
        >
          <Icon size={19} strokeWidth={2} />
        </div>

        <div className="min-w-0">
          <h2
            className="
              text-base font-semibold
              text-slate-800
              sm:text-lg
            "
          >
            {title}
          </h2>

          <p
            className="
              mt-1 max-w-2xl
              text-xs leading-5
              text-slate-400
            "
          >
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

const AlarmSoundSetting = ({
  value,
  volume,
  disabled,
  previewingSound,
  onChange,
  onPreview,
}) => {
  return (
    <div className="border-b border-slate-100 py-5">
      <div className="mb-4">
        <p className="text-sm font-semibold text-slate-700">
          Alarm sound
        </p>

        <p className="mt-1 max-w-xl text-xs leading-5 text-slate-400">
          Choose the sound played when a focus or break
          session finishes.
        </p>
      </div>

      <div
        className={`
          space-y-2
          transition-opacity
          ${
            disabled
              ? "pointer-events-none opacity-45"
              : ""
          }
        `}
      >
        {ALARM_SOUND_OPTIONS.map((sound) => {
          const selected =
            value === sound.id;

          const isPreviewing =
            previewingSound === sound.id;

          return (
            <div
              key={sound.id}
              className={`
                flex items-center gap-3
                rounded-2xl border
                px-4 py-3
                transition
                ${
                  selected
                    ? "border-blue-200 bg-blue-50/70"
                    : "border-slate-200 bg-white hover:bg-slate-50"
                }
              `}
            >
              <button
                type="button"
                onClick={() =>
                  onChange(sound.id)
                }
                className="
                  flex min-w-0 flex-1
                  items-center gap-3
                  text-left
                "
              >
                <span
                  className={`
                    flex h-9 w-9 shrink-0
                    items-center justify-center
                    rounded-xl
                    ${
                      selected
                        ? "bg-white text-blue-500"
                        : "bg-slate-50 text-slate-400"
                    }
                  `}
                >
                  <FiVolume1 size={17} />
                </span>

                <div className="min-w-0">
                  <p
                    className={`
                      text-sm font-medium
                      ${
                        selected
                          ? "text-blue-600"
                          : "text-slate-700"
                      }
                    `}
                  >
                    {sound.label}
                  </p>

                  {selected && (
                    <p className="mt-0.5 text-xs text-blue-400">
                      Selected
                    </p>
                  )}
                </div>
              </button>

              <button
                type="button"
                aria-label={
                  isPreviewing
                    ? `Stop ${sound.label}`
                    : `Preview ${sound.label}`
                }
                onClick={() =>
                  onPreview(sound.id)
                }
                className="
                  flex h-10 w-10 shrink-0
                  items-center justify-center
                  rounded-xl
                  border border-slate-200
                  bg-white
                  text-slate-500
                  transition
                  hover:border-blue-200
                  hover:text-blue-500
                "
              >
                {isPreviewing ? (
                  <FiSquare size={15} />
                ) : (
                  <FiPlay size={16} />
                )}
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
};

const VolumeSetting = ({
  value,
  disabled,
  onChange,
  onTest,
}) => {
  return (
    <div className="py-5">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-sm font-semibold text-slate-700">
            Alarm volume
          </p>

          <p className="mt-1 max-w-xl text-xs leading-5 text-slate-400">
            Choose how loud the timer alarm should play.
          </p>
        </div>

        <span className="shrink-0 text-sm font-semibold text-slate-600">
          {value}%
        </span>
      </div>

      <div
        className={`
          mt-5
          transition-opacity
          ${
            disabled
              ? "pointer-events-none opacity-45"
              : ""
          }
        `}
      >
        <input
          type="range"
          min="0"
          max="100"
          step="1"
          value={value}
          onChange={(event) =>
            onChange(
              Number(event.target.value)
            )
          }
          className="
            h-2 w-full cursor-pointer
            accent-blue-500
          "
        />

        <div className="mt-2 flex items-center justify-between">
          <span className="text-xs text-slate-400">
            Quiet
          </span>

          <button
            type="button"
            onClick={onTest}
            className="
              rounded-lg
              px-3 py-2
              text-xs font-semibold
              text-blue-500
              transition
              hover:bg-blue-50
            "
          >
            Test volume
          </button>

          <span className="text-xs text-slate-400">
            Loud
          </span>
        </div>
      </div>
    </div>
  );
};

const TimerRingSetting = ({
  value,
  onChange,
}) => {
  return (
    <div className="border-t border-slate-100 py-5">
      <div className="mb-4">
        <p className="text-sm font-semibold text-slate-700">
          Timer ring
        </p>

        <p className="mt-1 max-w-xl text-xs leading-5 text-slate-400">
          Choose how the countdown ring looks on
          your dashboard.
        </p>
      </div>

      <div className="grid grid-cols-2 gap-3 sm:grid-cols-5">
        {TIMER_RING_OPTIONS.map(
          (option) => {
            const selected =
              value === option.id;

            return (
              <button
                key={option.id}
                type="button"
                onClick={() =>
                  onChange(option.id)
                }
                className={`
                  flex min-h-[100px]
                  flex-col items-center
                  justify-center
                  rounded-2xl
                  border
                  px-3 py-4
                  text-center
                  transition
                  ${
                    selected
                      ? `
                        border-blue-300
                        bg-blue-50
                        ring-2
                        ring-blue-100
                      `
                      : `
                        border-slate-200
                        bg-white
                        hover:border-slate-300
                        hover:bg-slate-50
                      `
                  }
                `}
              >
                <RingPreview
                  style={option.id}
                  selected={selected}
                />

                <span
                  className={`
                    mt-3 text-xs
                    font-semibold
                    ${
                      selected
                        ? "text-blue-600"
                        : "text-slate-600"
                    }
                  `}
                >
                  {option.label}
                </span>
              </button>
            );
          }
        )}
      </div>
    </div>
  );
};

const RingPreview = ({
  style,
  selected,
}) => {
  const stroke =
    selected
      ? "#3B82F6"
      : "#94A3B8";

  if (style === "none") {
    return (
      <div className="
        flex h-10 w-10
        items-center justify-center
        rounded-full
        text-xs font-medium
        text-slate-400
      ">
        —
      </div>
    );
  }

  if (style === "wavy") {
    return (
      <svg
        viewBox="0 0 50 50"
        className="h-10 w-10"
        aria-hidden="true"
      >
        <path
          d="
            M25 4
            C30 4 31 8 35 9
            C40 10 41 14 42 18
            C45 22 43 26 44 30
            C43 35 40 36 38 40
            C34 43 31 42 27 45
            C22 46 20 43 16 43
            C12 41 11 37 8 34
            C6 30 8 27 6 23
            C7 18 10 17 11 13
            C15 10 18 11 21 7
            C23 5 24 4 25 4
            Z
          "
          fill="none"
          stroke={stroke}
          strokeWidth="3"
          strokeLinecap="round"
        />
      </svg>
    );
  }

  const dashArray =
    style === "dashed"
      ? "10 6"
      : style === "dotted"
        ? "1 6"
        : undefined;

  return (
    <svg
      viewBox="0 0 50 50"
      className="h-10 w-10"
      aria-hidden="true"
    >
      <circle
        cx="25"
        cy="25"
        r="19"
        fill="none"
        stroke={stroke}
        strokeWidth="3"
        strokeDasharray={dashArray}
        strokeLinecap="round"
      />
    </svg>
  );
};

const Settings = () => {
  const {
    settings,
    isLoading,
    error,
    saveSettings,
    resetSettings,
  } = useSettings();

  const [form, setForm] = useState(settings);
  const [saved, setSaved] = useState(false);
  const [isSaving, setIsSaving] =
  useState(false);

  const [isResetting, setIsResetting] =
    useState(false);

  const [previewingSound, setPreviewingSound] =
    useState(null);

  const previewAudioRef = useRef(null);

  useEffect(() => {
    setForm(settings);
  }, [settings]);

  const stopPreview = () => {
    if (!previewAudioRef.current) {
      setPreviewingSound(null);
      return;
    }

    previewAudioRef.current.pause();
    previewAudioRef.current.currentTime = 0;
    previewAudioRef.current = null;

    setPreviewingSound(null);
  };

  useEffect(() => {
    return () => {
      if (previewAudioRef.current) {
        previewAudioRef.current.pause();
        previewAudioRef.current.currentTime = 0;
      }
    };
  }, []);

  useEffect(() => {
    if (!form.soundEnabled) {
      stopPreview();
    }
  }, [form.soundEnabled]);

  const playPreview = (soundId) => {
    if (!form.soundEnabled) return;

    if (previewingSound === soundId) {
      stopPreview();
      return;
    }

    stopPreview();

    const selectedSound =
      ALARM_SOUNDS[soundId] ??
      ALARM_SOUNDS.default;

    const audio = new Audio(
      selectedSound.src
    );

    audio.volume =
      Math.min(
        Math.max(
          Number(form.alarmVolume) || 0,
          0
        ),
        100
      ) / 100;

    audio.onended = () => {
      previewAudioRef.current = null;
      setPreviewingSound(null);
    };

    previewAudioRef.current = audio;

    setPreviewingSound(soundId);

    audio.play().catch(() => {
      previewAudioRef.current = null;
      setPreviewingSound(null);
    });
  };

  const updateField = (field, value) => {
  setSaved(false);

  setForm((currentForm) => ({
    ...currentForm,
    [field]: value,
  }));

  if (
    field === "alarmVolume" &&
    previewAudioRef.current
  ) {
    previewAudioRef.current.volume =
      Math.min(
        Math.max(Number(value) || 0, 0),
        100
      ) / 100;
  }
};
  

 const handleSubmit = async (event) => {
    event.preventDefault();

    setSaved(false);
    setIsSaving(true);

    const sanitized = {
      ...form,

      pomodoroMinutes: Math.min(
        120,
        Math.max(
          1,
          Number(form.pomodoroMinutes) || 1
        )
      ),

      shortBreakMinutes: Math.min(
        30,
        Math.max(
          1,
          Number(form.shortBreakMinutes) || 1
        )
      ),

      longBreakMinutes: Math.min(
        60,
        Math.max(
          1,
          Number(form.longBreakMinutes) || 1
        )
      ),

      eyeReminderMinutes: Math.min(
        60,
        Math.max(
          1,
          Number(form.eyeReminderMinutes) || 1
        )
      ),

      eyeBreakSeconds: Math.min(
        120,
        Math.max(
          5,
          Number(form.eyeBreakSeconds) || 5
        )
      ),

      alarmVolume: Math.min(
        100,
        Math.max(
          0,
          Number(form.alarmVolume) || 0
        )
      ),
    };

    try {
      const result =
        await saveSettings(sanitized);

      if (!result) return;

      setForm({
        ...sanitized,
        ...result,
      });

      setSaved(true);
    } finally {
      setIsSaving(false);
    }
  };

  const handleReset = async () => {
    stopPreview();

    setSaved(false);
    setIsResetting(true);

    try {
      const result =
        await resetSettings();

      if (result) {
        setForm(result);
      }
    } finally {
      setIsResetting(false);
    }
  };

  return (
    <main
      className="
        min-h-screen
        bg-[#F8FAFC]
        px-4 py-6
        pb-28
        sm:px-6 sm:py-8
        lg:px-8
      "
    >
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
              <h1
                className="
                  text-2xl font-bold
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
                Customize your focus experience.
              </p>
            </div>
          </div>
        </header>

        {/* Account */}
        <div className="mb-5">
          <AccountSection />
        </div>

        {/* Loading / Error / Settings */}
        {isLoading ? (
          <WidgetState
            title="Loading settings"
            message="Restoring your focus preferences."
          />
        ) : (
          <>
            {/* Error */}
            {error && (
              <div
                role="alert"
                className="
                  mb-5 rounded-2xl
                  border border-red-100
                  bg-red-50
                  px-4 py-3
                  text-sm text-red-600
                "
              >
                {error}
              </div>
            )}

            {/* Settings Form */}
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
                <TimerRingSetting
                  value={
                    form.timerRingStyle
                  }
                  onChange={(value) =>
                    updateField(
                      "timerRingStyle",
                      value
                    )
                  }
                />
                <NumberSetting
                  label="Pomodoro"
                  description="Length of a focus session."
                  value={form?.pomodoroMinutes}
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
                  value={form?.shortBreakMinutes}
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
                  value={form?.longBreakMinutes}
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
                  enabled={Boolean(
                    form?.eyeCareEnabled
                  )}
                  onChange={(value) =>
                    updateField(
                      "eyeCareEnabled",
                      value
                    )
                  }
                />

                {form?.eyeCareEnabled && (
                  <div
                    className="
                      animate-in
                      fade-in
                      slide-in-from-top-1
                      duration-200
                    "
                  >
                    <NumberSetting
                      label="Reminder interval"
                      description="How often BLYNK'N reminds you to rest your eyes."
                      value={
                        form?.eyeReminderMinutes
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
                        form?.eyeBreakSeconds
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
                  </div>
                )}
              </SettingsSection>

              {/* Sounds */}
              <SettingsSection
                icon={FiVolume2}
                title="Sounds"
                description="Customize audio feedback when sessions end."
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

                <AlarmSoundSetting
                  value={form.alarmSound}
                  volume={form.alarmVolume}
                  disabled={!form.soundEnabled}
                  previewingSound={previewingSound}
                  onChange={(value) => {
                    stopPreview();

                    updateField(
                      "alarmSound",
                      value
                    );
                  }}
                  onPreview={playPreview}
                />

                <VolumeSetting
                  value={form.alarmVolume}
                  disabled={!form.soundEnabled}
                  onChange={(value) =>
                    updateField(
                      "alarmVolume",
                      value
                    )
                  }
                  onTest={() =>
                    playPreview(form.alarmSound)
                  }
                />
              </SettingsSection>

              {/* Actions */}
              <div
                className="
                  flex flex-col-reverse
                  gap-3 pt-2
                  sm:flex-row
                  sm:items-center
                  sm:justify-between
                "
              >
                <button
                  type="button"
                  onClick={handleReset}
                  disabled={
                        isResetting || isSaving
                      }
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
                    disabled:cursor-not-allowed
                    disabled:opacity-60
                  "
                >
                  <FiRefreshCcw size={16} />
                  {isResetting
                    ? "Resetting..."
                    : "Reset defaults"}
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
                        text-sm font-medium
                        text-emerald-600
                      "
                    >
                      Settings saved
                    </span>
                  )}

                  <button
                    type="submit"
                    disabled={isSaving}
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
                      disabled:cursor-not-allowed
                      disabled:opacity-60
                      focus:outline-none
                      focus:ring-4
                      focus:ring-blue-100
                    "
                  >
                    <FiSave size={16} />

                    {isSaving
                      ? "Saving..."
                      : "Save Settings"}
                  </button>
                </div>
              </div>
            </form>
          </>
        )}
      </div>
    </main>
  );
};

export default Settings;
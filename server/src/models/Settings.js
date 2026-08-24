import mongoose from "mongoose";

const settingsSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true,
      index: true,
    },

    pomodoroMinutes: {
      type: Number,
      default: 25,
      min: [1, "Pomodoro duration must be at least 1 minute"],
      max: [180, "Pomodoro duration cannot exceed 180 minutes"],
    },

    shortBreakMinutes: {
      type: Number,
      default: 5,
      min: [1, "Short break must be at least 1 minute"],
      max: [60, "Short break cannot exceed 60 minutes"],
    },

    longBreakMinutes: {
      type: Number,
      default: 10,
      min: [1, "Long break must be at least 1 minute"],
      max: [120, "Long break cannot exceed 120 minutes"],
    },

    eyeCareEnabled: {
      type: Boolean,
      default: true,
    },

    eyeReminderMinutes: {
      type: Number,
      default: 20,
      min: [1, "Eye reminder must be at least 1 minute"],
      max: [120, "Eye reminder cannot exceed 120 minutes"],
    },

    eyeBreakSeconds: {
      type: Number,
      default: 20,
      min: [5, "Eye break must be at least 5 seconds"],
      max: [300, "Eye break cannot exceed 300 seconds"],
    },

    soundEnabled: {
      type: Boolean,
      default: true,
    },

    alarmSound: {
      type: String,
      enum: [
        "default",
        "catLaugh",
        "dangerAlarm",
        "alarmDubist",
        "fahAlarm",
        "alarmVoice",
        "ratDanceAlarm",
      ],
      default: "default",
    },

    alarmVolume: {
      type: Number,
      min: [0, "Alarm volume cannot be below 0"],
      max: [100, "Alarm volume cannot exceed 100"],
      default: 80,
    },

    timerRingStyle: {
      type: String,
      enum: [
        "solid",
        "dashed",
        "dotted",
        "wavy",
        "none",
      ],
      default: "solid",
    },
  },
  {
    timestamps: true,
  }
);

const Settings = mongoose.model(
  "Settings",
  settingsSchema
);

export default Settings;
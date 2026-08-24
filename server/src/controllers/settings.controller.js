import Settings from "../models/Settings.js";

const formatSettings = (settings) => ({
  pomodoroMinutes: settings.pomodoroMinutes,
  shortBreakMinutes: settings.shortBreakMinutes,
  longBreakMinutes: settings.longBreakMinutes,

  eyeCareEnabled: settings.eyeCareEnabled,
  eyeReminderMinutes: settings.eyeReminderMinutes,
  eyeBreakSeconds: settings.eyeBreakSeconds,

  soundEnabled: settings.soundEnabled,
  alarmSound: settings.alarmSound,
  alarmVolume: settings.alarmVolume,

  timerRingStyle: settings.timerRingStyle,
});

export const getSettings = async (req, res) => {
  try {
    const settings =
      await Settings.findOneAndUpdate(
        {
          userId: req.userId,
        },
        {
          $setOnInsert: {
            userId: req.userId,
          },
        },
        {
          upsert: true,
          returnDocument: "after",
          setDefaultsOnInsert: true,
        }
      );

    return res.status(200).json({
      success: true,
      settings: formatSettings(settings),
    });
  } catch (error) {
    console.error("Get settings error:", error);

    return res.status(500).json({
      success: false,
      message: "Unable to retrieve settings",
    });
  }
};

export const updateSettings = async (
  req,
  res
) => {
  try {
    const allowedFields = [
      "pomodoroMinutes",
      "shortBreakMinutes",
      "longBreakMinutes",
      "eyeCareEnabled",
      "eyeReminderMinutes",
      "eyeBreakSeconds",
      "soundEnabled",
      "alarmSound",
      "alarmVolume",
      "timerRingStyle",
    ];

    const updates = {};

    for (const field of allowedFields) {
      if (req.body[field] !== undefined) {
        updates[field] = req.body[field];
      }
    }

    if (Object.keys(updates).length === 0) {
      return res.status(400).json({
        success: false,
        message: "No valid settings were provided",
      });
    }

    const settings =
      await Settings.findOneAndUpdate(
        {
          userId: req.userId,
        },
        {
          $set: updates,
          $setOnInsert: {
            userId: req.userId,
          },
        },
        {
          upsert: true,
          returnDocument: "after",
          runValidators: true,
          setDefaultsOnInsert: true,
        }
      );

    return res.status(200).json({
      success: true,
      settings: formatSettings(settings),
    });
  } catch (error) {
    if (error?.name === "ValidationError") {
      return res.status(400).json({
        success: false,
        message: error.message,
      });
    }

    console.error(
      "Update settings error:",
      error
    );

    return res.status(500).json({
      success: false,
      message: "Unable to update settings",
    });
  }
};
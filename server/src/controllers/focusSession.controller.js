import mongoose from "mongoose";

import FocusSession from "../models/FocusSession.js";
import Task from "../models/Task.js";

const formatFocusSession = (session) => ({
  id: session._id.toString(),
  type: session.type,
  taskId: session.taskId
    ? session.taskId.toString()
    : null,
  taskTitle: session.taskTitle,
  duration: session.duration,
  completed: session.completed,
  completedAt: session.completedAt,
});

export const getFocusSessions = async (
  req,
  res
) => {
  try {
    const sessions = await FocusSession.find({
      userId: req.userId,
    }).sort({
      completedAt: -1,
    });

    return res.status(200).json({
      success: true,
      sessions: sessions.map(
        formatFocusSession
      ),
    });
  } catch (error) {
    console.error(
      "Get focus sessions error:",
      error
    );

    return res.status(500).json({
      success: false,
      message:
        "Unable to retrieve focus sessions",
    });
  }
};

export const createFocusSession = async (
  req,
  res
) => {
  try {
    const {
      taskId = null,
      taskTitle = null,
      duration,
    } = req.body;

    if (
      typeof duration !== "number" ||
      !Number.isInteger(duration) ||
      duration <= 0 ||
      duration > 86400
    ) {
      return res.status(400).json({
        success: false,
        message:
          "Focus duration must be a valid number of seconds",
      });
    }

    let normalizedTaskId = null;

    if (taskId) {
      if (!mongoose.isValidObjectId(taskId)) {
        return res.status(400).json({
          success: false,
          message: "Invalid task reference",
        });
      }

      /*
       * If the task still exists, verify ownership.
       *
       * If it no longer exists, we still allow
       * the historical session because the task
       * may have been deleted during the timer.
       */
      const task = await Task.findById(taskId).select(
        "userId"
      );

      if (
        task &&
        task.userId.toString() !== req.userId
      ) {
        return res.status(400).json({
          success: false,
          message: "Invalid task reference",
        });
      }

      normalizedTaskId = taskId;
    }

    if (
      taskTitle !== null &&
      typeof taskTitle !== "string"
    ) {
      return res.status(400).json({
        success: false,
        message: "Invalid task title",
      });
    }

    const normalizedTaskTitle =
      typeof taskTitle === "string"
        ? taskTitle.trim() || null
        : null;

    const session = await FocusSession.create({
      userId: req.userId,

      // Never trust the browser to choose
      // whether this counts as Pomodoro.
      type: "pomodoro",

      taskId: normalizedTaskId,
      taskTitle: normalizedTaskTitle,

      duration,

      // Server controls completion state/time.
      completed: true,
      completedAt: new Date(),
    });

    return res.status(201).json({
      success: true,
      session: formatFocusSession(session),
    });
  } catch (error) {
    if (error?.name === "ValidationError") {
      return res.status(400).json({
        success: false,
        message: error.message,
      });
    }

    console.error(
      "Create focus session error:",
      error
    );

    return res.status(500).json({
      success: false,
      message:
        "Unable to record focus session",
    });
  }
};
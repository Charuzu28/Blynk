import mongoose from "mongoose";
import Task from "../models/Task.js";

const formatTask = (task) => ({
  id: task._id.toString(),
  title: task.title,
  completed: task.completed,
  estimatedPomodoros: task.estimatedPomodoros,
  completedPomodoros: task.completedPomodoros,
  createdAt: task.createdAt,
  updatedAt: task.updatedAt,
});

export const getTasks = async (req, res) => {
  try {
    const tasks = await Task.find({
      userId: req.userId,
    }).sort({
      createdAt: -1,
    });

    return res.status(200).json({
      success: true,
      tasks: tasks.map(formatTask),
    });
  } catch (error) {
    console.error("Get tasks error:", error);

    return res.status(500).json({
      success: false,
      message: "Unable to retrieve tasks",
    });
  }
};

export const createTask = async (req, res) => {
  try {
    const {
      title,
      estimatedPomodoros = 1,
    } = req.body;

    if (typeof title !== "string" || !title.trim()) {
      return res.status(400).json({
        success: false,
        message: "Task title is required",
      });
    }

    const task = await Task.create({
      userId: req.userId,
      title: title.trim(),
      estimatedPomodoros,
    });

    return res.status(201).json({
      success: true,
      task: formatTask(task),
    });
  } catch (error) {
    if (error?.name === "ValidationError") {
      return res.status(400).json({
        success: false,
        message: error.message,
      });
    }

    console.error("Create task error:", error);

    return res.status(500).json({
      success: false,
      message: "Unable to create task",
    });
  }
};

export const updateTask = async (req, res) => {
  try {
    const { taskId } = req.params;

    if (!mongoose.isValidObjectId(taskId)) {
      return res.status(400).json({
        success: false,
        message: "Invalid task ID",
      });
    }

    const allowedFields = [
        "title",
        "completed",
        "estimatedPomodoros",
        ];

    const updates = {};

    for (const field of allowedFields) {
      if (req.body[field] !== undefined) {
        updates[field] = req.body[field];
      }
    }

    if (updates.title !== undefined) {
      if (
        typeof updates.title !== "string" ||
        !updates.title.trim()
      ) {
        return res.status(400).json({
          success: false,
          message: "Task title is required",
        });
      }

      updates.title = updates.title.trim();
    }

    const task = await Task.findOneAndUpdate(
      {
        _id: taskId,
        userId: req.userId,
      },
      updates,
      {
        returnDocument: "after",
        runValidators: true,
      }
    );

    if (!task) {
      return res.status(404).json({
        success: false,
        message: "Task not found",
      });
    }

    return res.status(200).json({
      success: true,
      task: formatTask(task),
    });
  } catch (error) {
    if (error?.name === "ValidationError") {
      return res.status(400).json({
        success: false,
        message: error.message,
      });
    }

    console.error("Update task error:", error);

    return res.status(500).json({
      success: false,
      message: "Unable to update task",
    });
  }
};

export const deleteTask = async (req, res) => {
  try {
    const { taskId } = req.params;

    if (!mongoose.isValidObjectId(taskId)) {
      return res.status(400).json({
        success: false,
        message: "Invalid task ID",
      });
    }

    const task = await Task.findOneAndDelete({
      _id: taskId,
      userId: req.userId,
    });

    if (!task) {
      return res.status(404).json({
        success: false,
        message: "Task not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Task deleted successfully",
    });
  } catch (error) {
    console.error("Delete task error:", error);

    return res.status(500).json({
      success: false,
      message: "Unable to delete task",
    });
  }
};

export const incrementTaskPomodoro = async (req, res) => {
  try {
    const { taskId } = req.params;

    if (!mongoose.isValidObjectId(taskId)) {
      return res.status(400).json({
        success: false,
        message: "Invalid task ID",
      });
    }

    const task = await Task.findOneAndUpdate(
      {
        _id: taskId,
        userId: req.userId,
      },
      {
        $inc: {
          completedPomodoros: 1,
        },
      },
      {
        returnDocument: "after",
        runValidators: true,
      }
    );

    if (!task) {
      return res.status(404).json({
        success: false,
        message: "Task not found",
      });
    }

    return res.status(200).json({
      success: true,
      task: formatTask(task),
    });
  } catch (error) {
    console.error(
      "Increment task Pomodoro error:",
      error
    );

    return res.status(500).json({
      success: false,
      message: "Unable to update Pomodoro progress",
    });
  }
};
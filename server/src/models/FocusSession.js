import mongoose from "mongoose";

const focusSessionSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
    index: true,
  },

  type: {
    type: String,
    enum: ["pomodoro"],
    default: "pomodoro",
    required: true,
  },

  taskId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Task",
    default: null,
  },

  taskTitle: {
    type: String,
    trim: true,
    maxlength: [200, "Task title cannot exceed 200 characters"],
    default: null,
  },

  duration: {
    type: Number,
    required: true,
    min: [1, "Focus duration must be greater than zero"],
    max: [86400, "Focus duration is too large"],
  },

  completed: {
    type: Boolean,
    default: true,
    required: true,
  },

  completedAt: {
    type: Date,
    default: Date.now,
    required: true,
  },
});

focusSessionSchema.index({
  userId: 1,
  completedAt: -1,
});

const FocusSession = mongoose.model(
  "FocusSession",
  focusSessionSchema
);

export default FocusSession;
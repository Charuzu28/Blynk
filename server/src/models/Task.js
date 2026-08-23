import mongoose from "mongoose";

const taskSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },

    title: {
      type: String,
      required: [true, "Task title is required"],
      trim: true,
      minlength: [1, "Task title is required"],
      maxlength: [200, "Task title cannot exceed 200 characters"],
    },

    completed: {
      type: Boolean,
      default: false,
    },

    estimatedPomodoros: {
      type: Number,
      default: 1,
      min: 1,
      max: 100,
    },

    completedPomodoros: {
      type: Number,
      default: 0,
      min: 0,
    },
  },
  {
    timestamps: true,
  }
);

taskSchema.index({
  userId: 1,
  createdAt: -1,
});

const Task = mongoose.model("Task", taskSchema);

export default Task;
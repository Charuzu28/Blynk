import mongoose from "mongoose";

const noteSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },

    title: {
      type: String,
      required: true,
      trim: true,
      maxlength: [200, "Note title cannot exceed 200 characters"],
    },

    content: {
      type: String,
      default: "",
      maxlength: [20000, "Note content is too long"],
    },
  },
  {
    timestamps: true,
  }
);

noteSchema.index({
  userId: 1,
  updatedAt: -1,
});

const Note = mongoose.model("Note", noteSchema);

export default Note;
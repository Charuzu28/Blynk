import mongoose from "mongoose";
import Note from "../models/Note.js";

const formatNote = (note) => ({
  id: note._id.toString(),
  title: note.title,
  content: note.content,
  createdAt: note.createdAt,
  updatedAt: note.updatedAt,
});

export const getNotes = async (req, res) => {
  try {
    const notes = await Note.find({
      userId: req.userId,
    }).sort({
      updatedAt: -1,
    });

    return res.status(200).json({
      success: true,
      notes: notes.map(formatNote),
    });
  } catch (error) {
    console.error("Get notes error:", error);

    return res.status(500).json({
      success: false,
      message: "Unable to retrieve notes",
    });
  }
};

export const createNote = async (req, res) => {
  try {
    const { title, content } = req.body;

    if (
      typeof title !== "string" ||
      typeof content !== "string"
    ) {
      return res.status(400).json({
        success: false,
        message: "Title and content are required",
      });
    }

    const cleanTitle = title.trim();
    const cleanContent = content.trim();

    if (!cleanTitle && !cleanContent) {
      return res.status(400).json({
        success: false,
        message: "A note cannot be empty",
      });
    }

    const note = await Note.create({
      userId: req.userId,
      title: cleanTitle || "Untitled note",
      content: cleanContent,
    });

    return res.status(201).json({
      success: true,
      note: formatNote(note),
    });
  } catch (error) {
    if (error?.name === "ValidationError") {
      return res.status(400).json({
        success: false,
        message: error.message,
      });
    }

    console.error("Create note error:", error);

    return res.status(500).json({
      success: false,
      message: "Unable to create note",
    });
  }
};

export const updateNote = async (req, res) => {
  try {
    const { noteId } = req.params;
    const { title, content } = req.body;

    if (!mongoose.isValidObjectId(noteId)) {
      return res.status(400).json({
        success: false,
        message: "Invalid note ID",
      });
    }

    if (
      typeof title !== "string" ||
      typeof content !== "string"
    ) {
      return res.status(400).json({
        success: false,
        message: "Title and content are required",
      });
    }

    const cleanTitle = title.trim();
    const cleanContent = content.trim();

    if (!cleanTitle && !cleanContent) {
      return res.status(400).json({
        success: false,
        message: "A note cannot be empty",
      });
    }

    const note = await Note.findOneAndUpdate(
      {
        _id: noteId,
        userId: req.userId,
      },
      {
        title: cleanTitle || "Untitled note",
        content: cleanContent,
      },
      {
        returnDocument: "after",
        runValidators: true,
      }
    );

    if (!note) {
      return res.status(404).json({
        success: false,
        message: "Note not found",
      });
    }

    return res.status(200).json({
      success: true,
      note: formatNote(note),
    });
  } catch (error) {
    if (error?.name === "ValidationError") {
      return res.status(400).json({
        success: false,
        message: error.message,
      });
    }

    console.error("Update note error:", error);

    return res.status(500).json({
      success: false,
      message: "Unable to update note",
    });
  }
};

export const deleteNote = async (req, res) => {
  try {
    const { noteId } = req.params;

    if (!mongoose.isValidObjectId(noteId)) {
      return res.status(400).json({
        success: false,
        message: "Invalid note ID",
      });
    }

    const note = await Note.findOneAndDelete({
      _id: noteId,
      userId: req.userId,
    });

    if (!note) {
      return res.status(404).json({
        success: false,
        message: "Note not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Note deleted successfully",
    });
  } catch (error) {
    console.error("Delete note error:", error);

    return res.status(500).json({
      success: false,
      message: "Unable to delete note",
    });
  }
};
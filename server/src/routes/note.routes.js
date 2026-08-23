import { Router } from "express";

import { requireAuth } from "../middleware/auth.middleware.js";

import {
  createNote,
  deleteNote,
  getNotes,
  updateNote,
} from "../controllers/note.controller.js";

const router = Router();

router.use(requireAuth);

router.get("/", getNotes);
router.post("/", createNote);
router.patch("/:noteId", updateNote);
router.delete("/:noteId", deleteNote);

export default router;
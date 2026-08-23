import { Router } from "express";

import { requireAuth } from "../middleware/auth.middleware.js";

import {
  createFocusSession,
  getFocusSessions,
} from "../controllers/focusSession.controller.js";

const router = Router();

router.use(requireAuth);

router.get("/", getFocusSessions);
router.post("/", createFocusSession);

export default router;
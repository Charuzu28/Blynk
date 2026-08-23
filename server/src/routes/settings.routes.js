import { Router } from "express";

import { requireAuth } from "../middleware/auth.middleware.js";

import {
  getSettings,
  updateSettings,
} from "../controllers/settings.controller.js";

const router = Router();

router.use(requireAuth);

router.get("/", getSettings);
router.patch("/", updateSettings);

export default router;
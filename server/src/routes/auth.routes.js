import { Router } from "express";
import {
  register,
  login,
  logout,
  getCurrentUser,
} from "../controllers/auth.controller.js";
import { requireAuth } from "../middleware/auth.middleware.js";

import {
  authLimiter,
} from "../middleware/rateLimit.middleware.js";

const router = Router();

router.post(
  "/register",
  authLimiter,
  register
);

router.post(
  "/login",
  authLimiter,
  login
);
router.post("/logout", logout);

router.get("/me", requireAuth, getCurrentUser);

export default router;
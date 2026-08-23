import { Router } from "express";

import { requireAuth } from "../middleware/auth.middleware.js";

import {
  createTask,
  deleteTask,
  getTasks,
  incrementTaskPomodoro,
  updateTask,
} from "../controllers/task.controller.js";

const router = Router();

router.use(requireAuth);

router.get("/", getTasks);
router.post("/", createTask);

router.patch(
  "/:taskId/pomodoro",
  incrementTaskPomodoro
);

router.patch("/:taskId", updateTask);
router.delete("/:taskId", deleteTask);


export default router;
import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import helmet from "helmet";

import authRoutes from "./routes/auth.routes.js";
import taskRoutes from "./routes/task.routes.js";
import noteRoutes from "./routes/note.routes.js";
import focusSessionRoutes from "./routes/focusSession.routes.js";
import settingsRoutes from "./routes/settings.routes.js";

import {
  apiLimiter,
} from "./middleware/rateLimit.middleware.js";

const app = express();

app.disable("x-powered-by");

app.use(helmet());

app.use(
  cors({
    origin:
      process.env.CLIENT_URL ||
      "http://localhost:5173",
    credentials: true,
  })
);

app.use(
  express.json({
    limit: "100kb",
  })
);

app.use(cookieParser());

app.use("/api", apiLimiter);

app.get("/api/health", (req, res) => {
  res.status(200).json({
    success: true,
    message: "BLYNK'N API is running",
  });
});

app.use("/api/auth", authRoutes);
app.use("/api/tasks", taskRoutes);
app.use("/api/notes", noteRoutes);

app.use(
  "/api/focus-sessions",
  focusSessionRoutes
);

app.use(
  "/api/settings",
  settingsRoutes
);

export default app;
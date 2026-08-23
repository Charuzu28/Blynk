import {
  AUTH_COOKIE_NAME,
  verifyAuthToken,
} from "../utils/authToken.js";

export const requireAuth = (req, res, next) => {
  try {
    const token = req.cookies?.[AUTH_COOKIE_NAME];

    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Authentication required",
      });
    }

    const payload = verifyAuthToken(token);

    if (!payload?.userId) {
      return res.status(401).json({
        success: false,
        message: "Invalid authentication session",
      });
    }

    req.userId = payload.userId;

    next();
  } catch {
    return res.status(401).json({
      success: false,
      message: "Invalid or expired authentication session",
    });
  }
};
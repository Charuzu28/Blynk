import User from "../models/User.js";
import crypto from "node:crypto";
import {
  hashPassword,
  comparePassword,
} from "../utils/password.js";
import { sendPasswordResetEmail } from "../utils/email.js";

import {
  createAuthToken,
  setAuthCookie,
  clearAuthCookie,
} from "../utils/authToken.js";

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const hashResetToken = (token) =>
  crypto.createHash("sha256").update(token).digest("hex");

export const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (
      typeof name !== "string" ||
      typeof email !== "string" ||
      typeof password !== "string"
    ) {
      return res.status(400).json({
        success: false,
        message: "Name, email, and password are required",
      });
    }

    const normalizedName = name.trim();
    const normalizedEmail = email.trim().toLowerCase();

    if (normalizedName.length < 2 || normalizedName.length > 50) {
      return res.status(400).json({
        success: false,
        message: "Name must be between 2 and 50 characters",
      });
    }

    if (!EMAIL_REGEX.test(normalizedEmail)) {
      return res.status(400).json({
        success: false,
        message: "Please provide a valid email address",
      });
    }

    if (password.length < 8) {
      return res.status(400).json({
        success: false,
        message: "Password must be at least 8 characters",
      });
    }

    if (Buffer.byteLength(password, "utf8") > 72) {
      return res.status(400).json({
        success: false,
        message: "Password is too long",
      });
    }

    const existingUser = await User.findOne({
      email: normalizedEmail,
    });

    if (existingUser) {
      return res.status(409).json({
        success: false,
        message: "An account with this email already exists",
      });
    }

    const passwordHash = await hashPassword(password);

    const user = await User.create({
      name: normalizedName,
      email: normalizedEmail,
      passwordHash,
    });

    const token = createAuthToken(user._id);

    setAuthCookie(res, token);

    return res.status(201).json({
      success: true,
      message: "Account created successfully",
      user: {
        id: user._id.toString(),
        name: user.name,
        email: user.email,
      },
    });
  } catch (error) {
    if (error?.code === 11000) {
      return res.status(409).json({
        success: false,
        message: "An account with this email already exists",
      });
    }

    console.error("Registration error:", error);

    return res.status(500).json({
      success: false,
      message: "Unable to create account",
    });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (
      typeof email !== "string" ||
      typeof password !== "string"
    ) {
      return res.status(400).json({
        success: false,
        message: "Email and password are required",
      });
    }

    const normalizedEmail = email.trim().toLowerCase();

    if (!normalizedEmail || !password) {
      return res.status(400).json({
        success: false,
        message: "Email and password are required",
      });
    }

    if (Buffer.byteLength(password, "utf8") > 72) {
      return res.status(400).json({
        success: false,
        message: "Password is too long",
      });
    }

    const user = await User.findOne({
      email: normalizedEmail,
    }).select("+passwordHash");

    if (!user) {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password",
      });
    }

    const passwordMatches = await comparePassword(
      password,
      user.passwordHash
    );

    if (!passwordMatches) {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password",
      });
    }

    const token = createAuthToken(user._id);

    setAuthCookie(res, token);

    return res.status(200).json({
      success: true,
      message: "Login successful",
      user: {
        id: user._id.toString(),
        name: user.name,
        email: user.email,
      },
    });
  } catch (error) {
    console.error("Login error:", error);

    return res.status(500).json({
      success: false,
      message: "Unable to log in",
    });
  }
};

export const getCurrentUser = async (req, res) => {
  try {
    const user = await User.findById(req.userId);

    if (!user) {
      return res.status(401).json({
        success: false,
        message: "Authentication session is no longer valid",
      });
    }

    return res.status(200).json({
      success: true,
      user: {
        id: user._id.toString(),
        name: user.name,
        email: user.email,
      },
    });
  } catch (error) {
    console.error("Current user error:", error);

    return res.status(500).json({
      success: false,
      message: "Unable to retrieve current user",
    });
  }
};

export const logout = (req, res) => {
  clearAuthCookie(res);

  return res.status(200).json({
    success: true,
    message: "Logged out successfully",
  });
};

export const requestPasswordReset = async (req, res) => {
  try {
    const email =
      typeof req.body.email === "string"
        ? req.body.email.trim().toLowerCase()
        : "";

    if (!EMAIL_REGEX.test(email)) {
      return res.status(400).json({
        success: false,
        message: "Please provide a valid email address",
      });
    }

    const user = await User.findOne({ email });

    if (user) {
      const resetToken = crypto.randomBytes(32).toString("hex");
      const resetTokenHash = hashResetToken(resetToken);

      user.passwordResetTokenHash = resetTokenHash;
      user.passwordResetExpiresAt = new Date(
        Date.now() + 60 * 60 * 1000
      );
      await user.save();

      await sendPasswordResetEmail({
        email: user.email,
        name: user.name,
        resetToken,
      });
    }

    return res.status(200).json({
      success: true,
      message:
        "If an account exists for that email, a password reset link has been sent.",
    });
  } catch (error) {
    console.error("Password reset request error:", error);

    return res.status(500).json({
      success: false,
      message: "Unable to send the password reset email",
    });
  }
};

export const resetPassword = async (req, res) => {
  try {
    const { token, password } = req.body;

    if (
      typeof token !== "string" ||
      typeof password !== "string" ||
      !token
    ) {
      return res.status(400).json({
        success: false,
        message: "Reset token and password are required",
      });
    }

    if (password.length < 8) {
      return res.status(400).json({
        success: false,
        message: "Password must be at least 8 characters",
      });
    }

    if (Buffer.byteLength(password, "utf8") > 72) {
      return res.status(400).json({
        success: false,
        message: "Password is too long",
      });
    }

    const user = await User.findOne({
      passwordResetTokenHash: hashResetToken(token),
      passwordResetExpiresAt: { $gt: new Date() },
    }).select("+passwordHash +passwordResetTokenHash +passwordResetExpiresAt");

    if (!user) {
      return res.status(400).json({
        success: false,
        message: "This password reset link is invalid or has expired",
      });
    }

    user.passwordHash = await hashPassword(password);
    user.passwordResetTokenHash = undefined;
    user.passwordResetExpiresAt = undefined;
    await user.save();

    return res.status(200).json({
      success: true,
      message: "Password reset successfully",
    });
  } catch (error) {
    console.error("Password reset error:", error);

    return res.status(500).json({
      success: false,
      message: "Unable to reset password",
    });
  }
};
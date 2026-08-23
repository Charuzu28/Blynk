import jwt from "jsonwebtoken";

export const AUTH_COOKIE_NAME = "blynkn_auth";

const TOKEN_EXPIRES_IN = "7d";

const COOKIE_MAX_AGE = 7 * 24 * 60 * 60 * 1000;

const getJwtSecret = () => {
  const jwtSecret = process.env.JWT_SECRET;

  if (!jwtSecret) {
    throw new Error("JWT_SECRET is not defined");
  }

  return jwtSecret;
};

const getAuthCookieBaseOptions = () => ({
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
  sameSite: "lax",
  path: "/",
});

export const createAuthToken = (userId) => {
  return jwt.sign(
    {
      userId: userId.toString(),
    },
    getJwtSecret(),
    {
      algorithm: "HS256",
      expiresIn: TOKEN_EXPIRES_IN,
    }
  );
};

export const verifyAuthToken = (token) => {
  return jwt.verify(token, getJwtSecret(), {
    algorithms: ["HS256"],
  });
};

export const getAuthCookieOptions = () => ({
  ...getAuthCookieBaseOptions(),
  maxAge: COOKIE_MAX_AGE,
});

export const setAuthCookie = (res, token) => {
  res.cookie(
    AUTH_COOKIE_NAME,
    token,
    getAuthCookieOptions()
  );
};

export const clearAuthCookie = (res) => {
  res.clearCookie(
    AUTH_COOKIE_NAME,
    getAuthCookieBaseOptions()
  );
};
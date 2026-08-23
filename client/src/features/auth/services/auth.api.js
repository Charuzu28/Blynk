import {
  apiRequest,
} from "../../../services/apiClient";

const request = async (path, options = {}) => {
  const response = await fetch(`${API_BASE_URL}${path}`, {
    ...options,
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
      ...options.headers,
    },
  });

  const data = await response.json().catch(() => ({}));

  if (!response.ok) {
    const error = new Error(
      data.message || "Something went wrong"
    );

    error.status = response.status;

    throw error;
  }

  return data;
};

export const registerUser = async ({
  name,
  email,
  password,
}) => {
  const data = await apiRequest("/api/auth/register", {
    method: "POST",
    body: JSON.stringify({
      name,
      email,
      password,
    }),
  });

  return data.user;
};

export const loginUser = async ({
  email,
  password,
}) => {
  const data = await apiRequest("/api/auth/login", {
    method: "POST",
    body: JSON.stringify({
      email,
      password,
    }),
  });

  return data.user;
};

export const getCurrentUser = async () => {
  try {
    const data = await apiRequest("/api/auth/me");

    return data.user;
  } catch (error) {
    if (error.status === 401) {
      return null;
    }

    throw error;
  }
};

export const logoutUser = async () => {
  await request("/api/auth/logout", {
    method: "POST",
  });
};
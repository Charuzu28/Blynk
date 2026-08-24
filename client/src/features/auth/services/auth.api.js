import {
  apiRequest,
} from "../../../services/apiClient";

export const registerUser = async ({
  name,
  email,
  password,
}) => {
  const data = await apiRequest(
    "/api/auth/register",
    {
      method: "POST",
      body: JSON.stringify({
        name,
        email,
        password,
      }),
    }
  );

  return data.user;
};

export const loginUser = async ({
  email,
  password,
}) => {
  const data = await apiRequest(
    "/api/auth/login",
    {
      method: "POST",
      body: JSON.stringify({
        email,
        password,
      }),
    }
  );

  return data.user;
};

export const getCurrentUser = async () => {
  try {
    const data = await apiRequest(
      "/api/auth/me"
    );

    return data.user;
  } catch (error) {
    if (error.status === 401) {
      return null;
    }

    throw error;
  }
};

export const logoutUser = async () => {
  const data = await apiRequest(
    "/api/auth/logout",
    {
      method: "POST",
    }
  );

  return data;
};
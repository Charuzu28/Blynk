const API_BASE_URL =
  import.meta.env.VITE_API_URL ||
  "http://localhost:5000";

const request = async (path, options = {}) => {
  const response = await fetch(
    `${API_BASE_URL}${path}`,
    {
      ...options,
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
        ...options.headers,
      },
    }
  );

  const data = await response
    .json()
    .catch(() => ({}));

  if (!response.ok) {
    const error = new Error(
      data.message ||
        "Unable to process focus session request"
    );

    error.status = response.status;

    throw error;
  }

  return data;
};

export const getFocusSessions = async () => {
  const data = await request(
    "/api/focus-sessions"
  );

  return data.sessions;
};

export const createFocusSession = async ({
  taskId,
  taskTitle,
  duration,
}) => {
  const data = await request(
    "/api/focus-sessions",
    {
      method: "POST",
      body: JSON.stringify({
        taskId,
        taskTitle,
        duration,
      }),
    }
  );

  return data.session;
};
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
        "Unable to process settings request"
    );

    error.status = response.status;

    throw error;
  }

  return data;
};

export const getSettings = async () => {
  const data = await request("/api/settings");

  return data.settings;
};

export const updateSettingsRequest = async (
  settings
) => {
  const data = await request("/api/settings", {
    method: "PATCH",
    body: JSON.stringify(settings),
  });

  return data.settings;
};
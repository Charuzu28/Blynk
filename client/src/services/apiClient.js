const API_BASE_URL = import.meta.env.DEV
  ? import.meta.env.VITE_API_URL ||
    "http://localhost:5000"
  : "";

export const apiRequest = async (
  path,
  options = {}
) => {
  let response;

  try {
    response = await fetch(
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
  } catch {
    const error = new Error(
      "Unable to connect to the server"
    );

    error.status = 0;
    error.code = "NETWORK_ERROR";

    throw error;
  }

  const data = await response
    .json()
    .catch(() => ({}));

  if (!response.ok) {
    const error = new Error(
      data.message ||
        `Request failed with status ${response.status}`
    );

    error.status = response.status;
    error.data = data;

    throw error;
  }

  return data;
};
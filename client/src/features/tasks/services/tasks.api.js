import {
  apiRequest,
} from "../../../services/apiClient";

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
      data.message || "Unable to process task request"
    );

    error.status = response.status;

    throw error;
  }

  return data;
};

export const getTasks = async () => {
  const data = await apiRequest("/api/tasks");

  return data.tasks;
};

export const createTask = async ({
  title,
  estimatedPomodoros,
}) => {
  const data = await apiRequest("/api/tasks", {
    method: "POST",
    body: JSON.stringify({
      title,
      estimatedPomodoros,
    }),
  });

  return data.task;
};

export const updateTask = async (
  taskId,
  updates
) => {
  const data = await apiRequest(
    `/api/tasks/${taskId}`,
    {
      method: "PATCH",
      body: JSON.stringify(updates),
    }
  );

  return data.task;
};

export const deleteTaskById = async (taskId) => {
  await apiRequest(`/api/tasks/${taskId}`, {
    method: "DELETE",
  });
};

export const incrementTaskPomodoroById =
  async (taskId) => {
    const data = await apiRequest(
      `/api/tasks/${taskId}/pomodoro`,
      {
        method: "PATCH",
      }
    );

    return data.task;
  };
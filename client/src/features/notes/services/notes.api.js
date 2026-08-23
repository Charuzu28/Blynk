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
      data.message || "Unable to process note request"
    );

    error.status = response.status;

    throw error;
  }

  return data;
};

export const getNotes = async () => {
  const data = await request("/api/notes");

  return data.notes;
};

export const createNote = async ({
  title,
  content,
}) => {
  const data = await request("/api/notes", {
    method: "POST",
    body: JSON.stringify({
      title,
      content,
    }),
  });

  return data.note;
};

export const updateNoteById = async (
  noteId,
  { title, content }
) => {
  const data = await request(
    `/api/notes/${noteId}`,
    {
      method: "PATCH",
      body: JSON.stringify({
        title,
        content,
      }),
    }
  );

  return data.note;
};

export const deleteNoteById = async (noteId) => {
  await request(`/api/notes/${noteId}`, {
    method: "DELETE",
  });
};
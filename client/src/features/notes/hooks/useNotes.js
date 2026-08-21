import { useMemo, useState, useEffect } from "react";

const STORAGE_KEY = "blynk_notes_v2";

const createNoteId = () => {
  return crypto.randomUUID();
};

const useNotes = () => {
  const [notes, setNotes] = useState(() => {
    try {
      const savedNotes = localStorage.getItem(STORAGE_KEY);

      return savedNotes ? JSON.parse(savedNotes) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify(notes)
    );
  }, [notes]);

  const addNote = ({ title, content }) => {
    const cleanTitle = title.trim();
    const cleanContent = content.trim();

    if (!cleanTitle && !cleanContent) {
      return null;
    }

    const now = new Date().toISOString();

    const note = {
      id: createNoteId(),
      title: cleanTitle || "Untitled note",
      content: cleanContent,
      createdAt: now,
      updatedAt: now,
    };

    setNotes((currentNotes) => [
      note,
      ...currentNotes,
    ]);

    return note;
  };

  const updateNote = (
    noteId,
    { title, content }
  ) => {
    const cleanTitle = title.trim();
    const cleanContent = content.trim();

    if (!cleanTitle && !cleanContent) {
      return;
    }

    setNotes((currentNotes) =>
      currentNotes.map((note) =>
        note.id === noteId
          ? {
              ...note,
              title:
                cleanTitle ||
                "Untitled note",
              content: cleanContent,
              updatedAt:
                new Date().toISOString(),
            }
          : note
      )
    );
  };

  const deleteNote = (noteId) => {
    setNotes((currentNotes) =>
      currentNotes.filter(
        (note) => note.id !== noteId
      )
    );
  };

  const sortedNotes = useMemo(() => {
    return [...notes].sort(
      (a, b) =>
        new Date(b.updatedAt) -
        new Date(a.updatedAt)
    );
  }, [notes]);

  return {
    notes: sortedNotes,
    addNote,
    updateNote,
    deleteNote,
  };
};

export default useNotes;
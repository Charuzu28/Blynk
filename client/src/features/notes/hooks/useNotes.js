import {
  useEffect,
  useMemo,
  useState,
} from "react";

import {
  createNote,
  deleteNoteById,
  getNotes,
  updateNoteById,
} from "../services/notes.api";

const useNotes = () => {
  const [notes, setNotes] = useState([]);

  const [isLoading, setIsLoading] =
    useState(true);

  const [error, setError] = useState(null);

  useEffect(() => {
    let isMounted = true;

    const loadNotes = async () => {
      try {
        setError(null);

        const loadedNotes = await getNotes();

        if (isMounted) {
          setNotes(loadedNotes);
        }
      } catch (error) {
        console.error(
          "Unable to load notes:",
          error
        );

        if (isMounted) {
          setError(error.message);
        }
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    };

    loadNotes();

    return () => {
      isMounted = false;
    };
  }, []);

  const addNote = async ({
    title,
    content,
  }) => {
    const cleanTitle = title.trim();
    const cleanContent = content.trim();

    if (!cleanTitle && !cleanContent) {
      return null;
    }

    try {
      setError(null);

      const note = await createNote({
        title: cleanTitle,
        content: cleanContent,
      });

      setNotes((currentNotes) => [
        note,
        ...currentNotes,
      ]);

      return note;
    } catch (error) {
      console.error(
        "Unable to create note:",
        error
      );

      setError(error.message);

      return null;
    }
  };

  const updateNote = async (
    noteId,
    { title, content }
  ) => {
    const cleanTitle = title.trim();
    const cleanContent = content.trim();

    if (!cleanTitle && !cleanContent) {
      return null;
    }

    try {
      setError(null);

      const updatedNote =
        await updateNoteById(noteId, {
          title: cleanTitle,
          content: cleanContent,
        });

      setNotes((currentNotes) =>
        currentNotes.map((note) =>
          note.id === noteId
            ? updatedNote
            : note
        )
      );

      return updatedNote;
    } catch (error) {
      console.error(
        "Unable to update note:",
        error
      );

      setError(error.message);

      return null;
    }
  };

  const deleteNote = async (noteId) => {
    try {
      setError(null);

      await deleteNoteById(noteId);

      setNotes((currentNotes) =>
        currentNotes.filter(
          (note) => note.id !== noteId
        )
      );

      return true;
    } catch (error) {
      console.error(
        "Unable to delete note:",
        error
      );

      setError(error.message);

      return false;
    }
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

    isLoading,
    error,

    addNote,
    updateNote,
    deleteNote,
  };
};

export default useNotes;
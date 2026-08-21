import { useState } from "react";

import {
  FiFileText,
  FiPlus,
} from "react-icons/fi";

import NoteItem from "./NoteItem";
import NoteEditor from "./NoteEditor";

const NotesWidget = ({
  notes,
  onAddNote,
  onUpdateNote,
  onDeleteNote,
}) => {
  const [editorOpen, setEditorOpen] =
    useState(false);

  const [editingNote, setEditingNote] =
    useState(null);

  const visibleNotes = notes.slice(
    0,
    3
  );

  const openNewNote = () => {
    setEditingNote(null);
    setEditorOpen(true);
  };

  const openEditNote = (note) => {
    setEditingNote(note);
    setEditorOpen(true);
  };

  const closeEditor = () => {
    setEditorOpen(false);
    setEditingNote(null);
  };

  const handleSave = (noteData) => {
    if (editingNote) {
      onUpdateNote(
        editingNote.id,
        noteData
      );

      return;
    }

    onAddNote(noteData);
  };

  return (
    <>
      <section
        className="
          flex min-h-[310px]
          flex-col
          rounded-[28px]
          border border-slate-100
          bg-white p-5
          shadow-[0_10px_40px_rgba(15,23,42,0.05)]
          sm:p-6
        "
      >
        <div
          className="
            flex items-center
            justify-between
          "
        >
          <div
            className="
              flex items-center gap-3
            "
          >
            <div
              className="
                flex h-8 w-8
                items-center
                justify-center
                text-blue-500
              "
            >
              <FiFileText size={22} />
            </div>

            <h2
              className="
                text-lg font-medium
                text-slate-800
              "
            >
              Notes
            </h2>
          </div>
        </div>

        <div className="mt-5 flex-1">
          {visibleNotes.length === 0 ? (
            <div
              className="
                flex h-full
                min-h-[150px]
                items-center
                justify-center
                text-center
              "
            >
              <div>
                <FiFileText
                  size={24}
                  className="
                    mx-auto
                    text-slate-300
                  "
                />

                <p
                  className="
                    mt-3 text-sm
                    text-slate-400
                  "
                >
                  No notes yet.
                </p>

                <p
                  className="
                    mt-1 text-xs
                    text-slate-300
                  "
                >
                  Capture something
                  while you focus.
                </p>
              </div>
            </div>
          ) : (
            <div className="space-y-2">
              {visibleNotes.map(
                (note) => (
                  <NoteItem
                    key={note.id}
                    note={note}
                    onEdit={
                      openEditNote
                    }
                    onDelete={
                      onDeleteNote
                    }
                  />
                )
              )}
            </div>
          )}
        </div>

        <button
          type="button"
          onClick={openNewNote}
          className="
            mt-4 flex
            cursor-pointer
            items-center
            justify-center gap-2
            border-t
            border-slate-100
            pt-4 text-sm
            font-medium
            text-blue-500
            transition
            hover:text-blue-600
          "
        >
          <FiPlus size={16} />

          New Note
        </button>
      </section>

      <NoteEditor
        open={editorOpen}
        note={editingNote}
        onClose={closeEditor}
        onSave={handleSave}
      />
    </>
  );
};

export default NotesWidget;
import { useState } from "react";
import { Link } from "react-router-dom";

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
  compact = false,
}) => {
  const [editorOpen, setEditorOpen] =
    useState(false);

  const [editingNote, setEditingNote] =
    useState(null);

  // Dashboard only:
  // 1–3 notes = normal
  // 4+ notes = show around 3 rows + scrollbar
  const shouldScroll =
    compact && notes.length >= 4;

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

      closeEditor();
      return;
    }

    onAddNote(noteData);

    closeEditor();
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
        {/* Header */}
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

        {/* Notes */}
        <div className="mt-5 min-h-0 flex-1">
          {notes.length === 0 ? (
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
            <div
              className={`
                space-y-2

                ${
                  shouldScroll
                    ? `
                      max-h-[215px]
                      overflow-y-auto
                      overscroll-contain
                      pr-1
                    `
                    : ""
                }
              `}
            >
              {notes.map((note) => (
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
              ))}
            </div>
          )}
        </div>

        {/* View All Notes - Dashboard only */}
        {compact &&
          notes.length >= 4 && (
            <Link
              to="/notes"
              className="
                mt-4
                border-t
                border-slate-100
                pt-4
                text-center
                text-sm
                font-medium
                text-blue-500
                transition
                hover:text-blue-600
              "
            >
              View all notes
            </Link>
          )}

        {/* New Note */}
        <button
          type="button"
          onClick={openNewNote}
          className={`
            flex
            cursor-pointer
            items-center
            justify-center
            gap-2
            text-sm
            font-medium
            text-blue-500
            transition
            hover:text-blue-600

            ${
              compact &&
              notes.length >= 4
                ? "mt-3"
                : `
                  mt-4
                  border-t
                  border-slate-100
                  pt-4
                `
            }
          `}
        >
          <FiPlus size={16} />
          New Note
        </button>
      </section>

      {/* Note Editor */}
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
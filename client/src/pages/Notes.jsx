import { Link } from "react-router-dom";

import {
  FiArrowLeft,
  FiFileText,
} from "react-icons/fi";

import useNotes from "../features/notes/hooks/useNotes";

import NotesWidget from "../features/notes/components/NotesWidget";

const Notes = () => {
  const {
    notes,
    addNote,
    updateNote,
    deleteNote,
  } = useNotes();

  return (
    <main
      className="
        min-h-screen
        bg-[#F8FAFC]
        px-4 py-7
        pb-32
        sm:px-6
        lg:px-8
      "
    >
      <div className="mx-auto max-w-4xl">
        <header
          className="
            mb-8
            flex items-center
            justify-between
          "
        >
          <div
            className="
              flex items-center gap-4
            "
          >
            <Link
              to="/"
              aria-label="Back home"
              className="
                flex h-10 w-10
                items-center
                justify-center
                rounded-full
                border border-slate-200
                bg-white
                text-slate-500
                transition
                hover:bg-slate-50
              "
            >
              <FiArrowLeft size={18} />
            </Link>

            <div>
              <h1
                className="
                  text-2xl
                  font-semibold
                  tracking-tight
                  text-slate-800
                "
              >
                Notes
              </h1>

              <p
                className="
                  mt-1 text-sm
                  text-slate-400
                "
              >
                Capture ideas while
                you're studying.
              </p>
            </div>
          </div>

          <div
            className="
              hidden items-center
              gap-2
              rounded-xl
              bg-blue-50
              px-4 py-2
              text-sm
              text-blue-500
              sm:flex
            "
          >
            <FiFileText />

            {notes.length}{" "}
            {notes.length === 1
              ? "note"
              : "notes"}
          </div>
        </header>

        <NotesWidget
          notes={notes}
          onAddNote={addNote}
          onUpdateNote={
            updateNote
          }
          onDeleteNote={
            deleteNote
          }
        />
      </div>
    </main>
  );
};

export default Notes;
import {
  useEffect,
  useState,
} from "react";

import { FiX } from "react-icons/fi";

const NoteEditor = ({
  open,
  note,
  onClose,
  onSave,
}) => {
  const [title, setTitle] =
    useState("");

  const [content, setContent] =
    useState("");

  useEffect(() => {
    if (!open) {
      return;
    }

    setTitle(note?.title || "");
    setContent(note?.content || "");
  }, [open, note]);

  if (!open) {
    return null;
  }

  const handleSubmit = (event) => {
    event.preventDefault();

    if (
      !title.trim() &&
      !content.trim()
    ) {
      return;
    }

    onSave({
      title,
      content,
    });

    onClose();
  };

  return (
    <div
      className="
        fixed inset-0 z-50
        flex items-center
        justify-center
        bg-slate-950/30
        px-4
        backdrop-blur-sm
      "
    >
      <form
        onSubmit={handleSubmit}
        className="
          relative w-full
          max-w-lg
          rounded-[28px]
          bg-white p-6
          shadow-2xl
          sm:p-8
        "
      >
        <button
          type="button"
          onClick={onClose}
          aria-label="Close editor"
          className="
            absolute right-5 top-5
            flex h-9 w-9
            cursor-pointer
            items-center
            justify-center
            rounded-full
            text-slate-400
            transition
            hover:bg-slate-100
            hover:text-slate-700
          "
        >
          <FiX size={19} />
        </button>

        <p
          className="
            text-sm font-medium
            text-blue-500
          "
        >
          {note
            ? "Edit Note"
            : "New Note"}
        </p>

        <input
          type="text"
          value={title}
          onChange={(event) =>
            setTitle(
              event.target.value
            )
          }
          placeholder="Note title"
          autoFocus
          className="
            mt-4 w-full
            border-none
            bg-transparent
            text-2xl font-semibold
            text-slate-800
            outline-none
            placeholder:text-slate-300
          "
        />

        <textarea
          value={content}
          onChange={(event) =>
            setContent(
              event.target.value
            )
          }
          placeholder="Write something..."
          rows={8}
          className="
            mt-5 w-full resize-none
            rounded-xl
            border border-slate-200
            bg-slate-50
            p-4 text-sm
            leading-6
            text-slate-600
            outline-none
            transition
            placeholder:text-slate-400
            focus:border-blue-300
            focus:bg-white
            focus:ring-2
            focus:ring-blue-50
          "
        />

        <div
          className="
            mt-6 flex
            justify-end gap-3
          "
        >
          <button
            type="button"
            onClick={onClose}
            className="
              cursor-pointer
              rounded-xl px-5 py-2.5
              text-sm font-medium
              text-slate-500
              transition
              hover:bg-slate-100
            "
          >
            Cancel
          </button>

          <button
            type="submit"
            className="
              cursor-pointer
              rounded-xl
              bg-blue-500
              px-5 py-2.5
              text-sm font-medium
              text-white
              transition
              hover:bg-blue-600
            "
          >
            Save Note
          </button>
        </div>
      </form>
    </div>
  );
};

export default NoteEditor;
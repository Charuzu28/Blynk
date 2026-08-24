import {
  FiEdit2,
  FiTrash2,
} from "react-icons/fi";

const formatNoteDate = (dateString) => {
  const date = new Date(dateString);
  const now = new Date();

  const isToday =
    date.toDateString() ===
    now.toDateString();

  if (isToday) {
    return date.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });
  }

  const yesterday = new Date();

  yesterday.setDate(
    yesterday.getDate() - 1
  );

  if (
    date.toDateString() ===
    yesterday.toDateString()
  ) {
    return "Yesterday";
  }

  return date.toLocaleDateString([], {
    month: "short",
    day: "numeric",
  });
};

const NoteItem = ({
  note,
  onEdit,
  onDelete,
}) => {
  return (
    <div
      className="
        group relative
        rounded-xl
        border border-slate-100
        px-4 py-3 pr-20
        transition
        hover:border-slate-200
        hover:bg-slate-50
      "
    >
      <div className="min-w-0">
        <div
          className="
            flex items-center
            justify-between gap-3
          "
        >
          <h3
            className="
              min-w-0 flex-1
              truncate text-sm
              font-medium
              text-slate-700
            "
          >
            {note.title}
          </h3>

          <span
            className="
              shrink-0
              text-[11px]
              text-slate-400
            "
          >
            {formatNoteDate(
              note.updatedAt
            )}
          </span>
        </div>

        {note.content && (
          <p
            className="
              mt-1 line-clamp-1
              text-xs leading-5
              text-slate-400
            "
          >
            {note.content}
          </p>
        )}
      </div>

      <div
        className="
          absolute
          right-3 top-1/2
          flex -translate-y-1/2
          items-center gap-1

          opacity-100
          transition-opacity

          sm:pointer-events-none
          sm:opacity-0

          sm:group-hover:pointer-events-auto
          sm:group-hover:opacity-100

          sm:group-focus-within:pointer-events-auto
          sm:group-focus-within:opacity-100
        "
      >
        <button
          type="button"
          onClick={() => onEdit(note)}
          aria-label="Edit note"
          className="
            cursor-pointer
            rounded-md p-1.5
            text-slate-400
            transition
            hover:bg-white
            hover:text-slate-700
          "
        >
          <FiEdit2 size={14} />
        </button>

        <button
          type="button"
          onClick={() =>
            onDelete(note.id)
          }
          aria-label="Delete note"
          className="
            cursor-pointer
            rounded-md p-1.5
            text-slate-400
            transition
            hover:bg-red-50
            hover:text-red-500
          "
        >
          <FiTrash2 size={14} />
        </button>
      </div>
    </div>
  );
};

export default NoteItem;
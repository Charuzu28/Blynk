import {
  useEffect,
  useState,
} from "react";

import {
  FiCheck,
  FiClock,
  FiEdit2,
  FiTrash2,
} from "react-icons/fi";

const TaskItem = ({
  task,
  isSelected,
  onToggle,
  onSelect,
  onEdit,
  onDelete,
}) => {
  const [isEditing, setIsEditing] =
    useState(false);

  const [title, setTitle] = useState(
    task.title
  );

  useEffect(() => {
    setTitle(task.title);
  }, [task.title]);

  const saveEdit = () => {
    const cleanTitle = title.trim();

    if (!cleanTitle) {
      setTitle(task.title);
      setIsEditing(false);

      return;
    }

    onEdit(task.id, cleanTitle);

    setIsEditing(false);
  };

  return (
    <div
      className={`
        group
        flex min-h-11
        items-center gap-3
        rounded-xl
        px-2 py-2
        transition

        ${
          isSelected
            ? "bg-blue-50"
            : "hover:bg-slate-50"
        }
      `}
    >
      <button
        type="button"
        aria-label={
          task.completed
            ? "Mark task incomplete"
            : "Mark task complete"
        }
        onClick={() =>
          onToggle(task.id)
        }
        className={`
          flex h-5 w-5
          shrink-0
          cursor-pointer
          items-center justify-center
          rounded-full
          border
          transition

          ${
            task.completed
              ? `
                border-blue-500
                bg-blue-500
                text-white
              `
              : `
                border-slate-300
                bg-white
                text-transparent
                hover:border-blue-400
              `
          }
        `}
      >
        <FiCheck size={12} />
      </button>

      <div
        className="
          min-w-0 flex-1
          cursor-pointer
        "
        onClick={() =>
          !isEditing &&
          onSelect(task.id)
        }
      >
        {isEditing ? (
          <input
            autoFocus
            value={title}
            onChange={(event) =>
              setTitle(
                event.target.value
              )
            }
            onBlur={saveEdit}
            onKeyDown={(event) => {
              if (
                event.key === "Enter"
              ) {
                saveEdit();
              }

              if (
                event.key === "Escape"
              ) {
                setTitle(
                  task.title
                );

                setIsEditing(
                  false
                );
              }
            }}
            className="
              w-full
              rounded-md
              border border-blue-300
              bg-white
              px-2 py-1
              text-sm
              outline-none
              focus:ring-2
              focus:ring-blue-100
            "
          />
        ) : (
          <p
            className={`
              truncate text-sm

              ${
                task.completed
                  ? `
                    text-slate-400
                    line-through
                  `
                  : "text-slate-700"
              }
            `}
          >
            {task.title}
          </p>
        )}
      </div>

      <div
        className="
          flex shrink-0
          items-center gap-1
          text-xs
          text-blue-500
        "
      >
        <FiClock size={14} />

        <span>
          {task.estimatedPomodoros}
        </span>
      </div>

      <div
        className="
          flex w-[62px]
          shrink-0
          items-center
          justify-end gap-1

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
          aria-label="Edit task"
          onClick={() =>
            setIsEditing(true)
          }
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
          aria-label="Delete task"
          onClick={() =>
            onDelete(task.id)
          }
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

export default TaskItem;
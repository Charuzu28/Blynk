import { useState } from "react";
import { Link } from "react-router-dom";

import {
  FiCheckCircle,
  FiPlus,
} from "react-icons/fi";

import TaskItem from "./TaskItem";

const TasksWidget = ({
  tasks,
  selectedTaskId,
  onAddTask,
  onToggleTask,
  onSelectTask,
  onEditTask,
  onDeleteTask,
  compact = false,
}) => {
  const [title, setTitle] = useState("");

  const [
    estimatedPomodoros,
    setEstimatedPomodoros,
  ] = useState(1);

  // Dashboard only:
  // 1–3 tasks = normal
  // 4+ tasks = show around 3 rows + scrollbar
  const shouldScroll =
    compact && tasks.length >= 4;

  const handleSubmit = (event) => {
    event.preventDefault();

    const cleanTitle = title.trim();

    if (!cleanTitle) {
      return;
    }

    onAddTask(
      cleanTitle,
      estimatedPomodoros
    );

    setTitle("");
    setEstimatedPomodoros(1);
  };

  return (
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
      <div className="flex items-center gap-3">
        <div
          className="
            flex h-8 w-8
            items-center
            justify-center
            rounded-full
            text-blue-500
          "
        >
          <FiCheckCircle size={22} />
        </div>

        <h2
          className="
            text-lg font-medium
            text-slate-800
          "
        >
          Add Task
        </h2>
      </div>

      {/* Add Task Form */}
      <form
        onSubmit={handleSubmit}
        className="mt-5"
      >
        <div
          className="
            flex overflow-hidden
            rounded-xl
            border border-slate-200
            bg-white
            focus-within:border-blue-300
            focus-within:ring-2
            focus-within:ring-blue-50
          "
        >
          <input
            type="text"
            value={title}
            onChange={(event) =>
              setTitle(
                event.target.value
              )
            }
            placeholder="What do you want to focus on?"
            className="
              min-w-0 flex-1
              bg-transparent
              px-4 py-3
              text-sm
              text-slate-700
              outline-none
              placeholder:text-slate-400
            "
          />

          <button
            type="submit"
            aria-label="Add task"
            className="
              m-1 flex h-9 w-9
              shrink-0
              cursor-pointer
              items-center
              justify-center
              rounded-lg
              bg-blue-500
              text-white
              transition
              hover:bg-blue-600
            "
          >
            <FiPlus size={18} />
          </button>
        </div>

        {/* Pomodoro Estimate */}
        <div
          className="
            mt-2 flex
            items-center
            justify-end
            gap-2
          "
        >
          <span
            className="
              text-xs
              text-slate-400
            "
          >
            Pomodoros
          </span>

          <select
            value={estimatedPomodoros}
            onChange={(event) =>
              setEstimatedPomodoros(
                Number(
                  event.target.value
                )
              )
            }
            className="
              cursor-pointer
              rounded-lg
              border border-slate-200
              bg-white
              px-2 py-1
              text-xs
              text-slate-600
              outline-none
            "
          >
            {[
              1,
              2,
              3,
              4,
              5,
              6,
              7,
              8,
            ].map((count) => (
              <option
                key={count}
                value={count}
              >
                {count}
              </option>
            ))}
          </select>
        </div>
      </form>

      {/* Task List */}
      <div className="mt-4 min-h-0 flex-1">
        {tasks.length === 0 ? (
          <div
            className="
              flex h-full
              min-h-[100px]
              items-center
              justify-center
              text-center
            "
          >
            <p
              className="
                max-w-[180px]
                text-sm
                leading-6
                text-slate-400
              "
            >
              Add a task to start
              focusing on something.
            </p>
          </div>
        ) : (
          <div
            className={`
              space-y-1

              ${
                shouldScroll
                  ? `
                    max-h-[140px]
                    overflow-y-auto
                    overscroll-contain
                    pr-1
                  `
                  : ""
              }
            `}
          >
            {tasks.map((task) => (
              <TaskItem
                key={task.id}
                task={task}
                isSelected={
                  task.id ===
                  selectedTaskId
                }
                onToggle={
                  onToggleTask
                }
                onSelect={
                  onSelectTask
                }
                onEdit={
                  onEditTask
                }
                onDelete={
                  onDeleteTask
                }
              />
            ))}
          </div>
        )}
      </div>

      {/* Dashboard only */}
      {compact &&
        tasks.length >= 4 && (
          <Link
            to="/tasks"
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
            View all tasks
          </Link>
        )}
    </section>
  );
};

export default TasksWidget;
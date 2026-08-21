import { useState } from "react";

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
}) => {
  const [title, setTitle] =
    useState("");

  const [estimatedPomodoros, setEstimatedPomodoros] =
    useState(1);

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!title.trim()) {
      return;
    }

    onAddTask(
      title,
      estimatedPomodoros
    );

    setTitle("");
    setEstimatedPomodoros(1);
  };

  const visibleTasks = tasks.slice(
    0,
    5
  );

  return (
    <section
      className="
        flex min-h-[310px]
        flex-col rounded-[28px]
        border border-slate-100
        bg-white p-5
        shadow-[0_10px_40px_rgba(15,23,42,0.05)]
        sm:p-6
      "
    >
      <div className="flex items-center gap-3">
        <div
          className="
            flex h-8 w-8
            items-center justify-center
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

      <form
        onSubmit={handleSubmit}
        className="mt-5"
      >
        <div
          className="
            flex overflow-hidden
            rounded-xl border
            border-slate-200
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
              text-sm text-slate-700
              outline-none
              placeholder:text-slate-400
            "
          />

          <button
            type="submit"
            aria-label="Add task"
            className="
              m-1 flex h-9 w-9
              shrink-0 cursor-pointer
              items-center justify-center
              rounded-lg
              bg-blue-500 text-white
              transition
              hover:bg-blue-600
            "
          >
            <FiPlus size={18} />
          </button>
        </div>

        <div
          className="
            mt-2 flex
            items-center justify-end
            gap-2
          "
        >
          <span
            className="
              text-xs text-slate-400
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
              rounded-lg border
              border-slate-200
              bg-white px-2 py-1
              text-xs text-slate-600
              outline-none
            "
          >
            {[1, 2, 3, 4, 5, 6, 7, 8].map(
              (count) => (
                <option
                  key={count}
                  value={count}
                >
                  {count}
                </option>
              )
            )}
          </select>
        </div>
      </form>

      <div className="mt-4 flex-1">
        {visibleTasks.length ===
        0 ? (
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
                text-sm leading-6
                text-slate-400
              "
            >
              Add a task to start
              focusing on something.
            </p>
          </div>
        ) : (
          <div className="space-y-1">
            {visibleTasks.map(
              (task) => (
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
              )
            )}
          </div>
        )}
      </div>

      {tasks.length > 5 && (
        <button
          type="button"
          className="
            mt-4 cursor-pointer
            border-t border-slate-100
            pt-4 text-sm
            font-medium
            text-blue-500
            hover:text-blue-600
          "
        >
          View all tasks
        </button>
      )}
    </section>
  );
};

export default TasksWidget;
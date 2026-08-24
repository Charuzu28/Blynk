import { FiSettings } from "react-icons/fi";
import { Link } from "react-router-dom";

import TimerCard from "../features/timer/components/TimerCard";
import useTasks
  from "../features/tasks/hooks/useTasks";
import TasksWidget
  from "../features/tasks/components/TaskWidget";
import useNotes
  from "../features/notes/hooks/useNotes";
import NotesWidget
  from "../features/notes/components/NotesWidget";
import useFocusSessions
  from "../features/focuSessions/hooks/useFocusSessions";
import FocusStreakCard
  from "../features/streak/components/FocusStreakCard";
import WidgetState from "../components/shared/WidgetState";

const Home = () => {
  const {
  tasks,
  selectedTask,
  selectedTaskId,
  isLoading: tasksLoading,
  error: tasksError,
  addTask,
  toggleTask,
  updateTaskTitle,
  deleteTask,
  selectTask,
  incrementTaskPomodoro,
} = useTasks();

const {
  notes,
  isLoading: notesLoading,
  error: notesError,
  addNote,
  updateNote,
  deleteNote,
} = useNotes();

const {
  sessions,
  isLoading: sessionsLoading,
  error: sessionsError,
  recordFocusSession,
} = useFocusSessions();

const handleFocusComplete = async ({
  task,
  duration,
}) => {
  const session =
    await recordFocusSession({
      taskId: task?.id ?? null,
      taskTitle: task?.title ?? null,
      duration,
    });

  if (!session) {
    return;
  }

  if (task?.id) {
    await incrementTaskPomodoro(task.id);
  }
};

  return (
    <main className="min-h-screen bg-[#F8FAFC] px-4 py-7 pb-28 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-[1440px]">
        {/* Header */}
        <header className="mb-8 flex items-center justify-between">
          <Link
            to="/"
            className="text-3xl font-regular tracking-tight text-blue-500"
          >
            blynk
          </Link>

          <Link
            to="/settings"
            aria-label="Settings"
            className="
              flex h-11 w-11
              items-center justify-center
              rounded-full border border-slate-200
              bg-white text-slate-500
              transition
              hover:bg-slate-50
            "
          >
            <FiSettings size={20} />
          </Link>
        </header>

        {/* Dashboard */}
        <div
          className="
            grid gap-5
            lg:grid-cols-[1.3fr_1fr]
          "
        >
          {/* LEFT SIDE */}
          <div className="grid gap-5">
            {/* Feature 6: Streak */}
            {sessionsLoading ? (
              <WidgetState
                title="Loading focus activity"
                message="Restoring your recent focus sessions."
              />
            ) : sessionsError ? (
              <WidgetState
                type="error"
                title="Couldn't load focus activity"
                message={sessionsError}
              />
            ) : (
              <FocusStreakCard
                sessions={sessions}
              />
            )}

            <div className="grid gap-5 sm:grid-cols-2">
              {/* Feature 4: Notes */}
              {notesLoading ? (
                <WidgetState
                  title="Loading notes"
                  message="Getting your latest notes."
                />
              ) : notesError ? (
                <WidgetState
                  type="error"
                  title="Couldn't load notes"
                  message={notesError}
                />
              ) : (
                <NotesWidget
                  compact
                  notes={notes}
                  onAddNote={addNote}
                  onUpdateNote={updateNote}
                  onDeleteNote={deleteNote}
                />
              )}

              {/* Feature 3: Tasks */}
              {tasksLoading ? (
                <WidgetState
                  title="Loading tasks"
                  message="Getting your current focus tasks."
                />
              ) : tasksError ? (
                <WidgetState
                  type="error"
                  title="Couldn't load tasks"
                  message={tasksError}
                />
              ) : (
                <TasksWidget
                  compact
                  tasks={tasks}
                  selectedTaskId={selectedTaskId}
                  onAddTask={addTask}
                  onToggleTask={toggleTask}
                  onSelectTask={selectTask}
                  onEditTask={updateTaskTitle}
                  onDeleteTask={deleteTask}
                />
                )}
            </div>
          </div>

          {/* FEATURE 1: POMODORO */}
          <TimerCard
            selectedTask={selectedTask}
            onFocusComplete={handleFocusComplete}
          />
        </div>
      </div>
    </main>
  );
};

export default Home;
import {
  useEffect,
  useMemo,
  useState,
} from "react";

import {
  createTask,
  deleteTaskById,
  getTasks,
  incrementTaskPomodoroById,
  updateTask,
} from "../services/tasks.api";

const SELECTED_TASK_KEY =
  "blynk_selected_task_v2";

const useTasks = () => {
  const [tasks, setTasks] = useState([]);

  const [isLoading, setIsLoading] =
    useState(true);

  const [error, setError] = useState(null);

  const [selectedTaskId, setSelectedTaskId] =
    useState(() => {
      return (
        localStorage.getItem(
          SELECTED_TASK_KEY
        ) || null
      );
    });

  /*
   * Load authenticated user's tasks
   * from MongoDB.
   */
  useEffect(() => {
    let isMounted = true;

    const loadTasks = async () => {
      try {
        setError(null);

        const loadedTasks = await getTasks();

        if (isMounted) {
          setTasks(loadedTasks);
        }
      } catch (error) {
        console.error(
          "Unable to load tasks:",
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

    loadTasks();

    return () => {
      isMounted = false;
    };
  }, []);

  /*
   * Active task selection remains
   * local UI state for now.
   */
  useEffect(() => {
    if (selectedTaskId) {
      localStorage.setItem(
        SELECTED_TASK_KEY,
        selectedTaskId
      );
    } else {
      localStorage.removeItem(
        SELECTED_TASK_KEY
      );
    }
  }, [selectedTaskId]);

  /*
   * Clear a selected task if it no longer
   * exists in the authenticated user's tasks.
   */
  useEffect(() => {
    if (
      isLoading ||
      !selectedTaskId
    ) {
      return;
    }

    const taskExists = tasks.some(
      (task) => task.id === selectedTaskId
    );

    if (!taskExists) {
      setSelectedTaskId(null);
    }
  }, [
    tasks,
    selectedTaskId,
    isLoading,
  ]);

  const addTask = async (
    title,
    estimatedPomodoros = 1
  ) => {
    const cleanTitle = title.trim();

    if (!cleanTitle) {
      return null;
    }

    try {
      setError(null);

      const task = await createTask({
        title: cleanTitle,
        estimatedPomodoros,
      });

      setTasks((currentTasks) => [
        task,
        ...currentTasks,
      ]);

      return task;
    } catch (error) {
      console.error(
        "Unable to create task:",
        error
      );

      setError(error.message);

      return null;
    }
  };

  const toggleTask = async (taskId) => {
    const task = tasks.find(
      (task) => task.id === taskId
    );

    if (!task) {
      return null;
    }

    try {
      setError(null);

      const updatedTask = await updateTask(
        taskId,
        {
          completed: !task.completed,
        }
      );

      setTasks((currentTasks) =>
        currentTasks.map((task) =>
          task.id === taskId
            ? updatedTask
            : task
        )
      );

      return updatedTask;
    } catch (error) {
      console.error(
        "Unable to update task:",
        error
      );

      setError(error.message);

      return null;
    }
  };

  const updateTaskTitle = async (
    taskId,
    nextTitle
  ) => {
    const cleanTitle = nextTitle.trim();

    if (!cleanTitle) {
      return null;
    }

    try {
      setError(null);

      const updatedTask = await updateTask(
        taskId,
        {
          title: cleanTitle,
        }
      );

      setTasks((currentTasks) =>
        currentTasks.map((task) =>
          task.id === taskId
            ? updatedTask
            : task
        )
      );

      return updatedTask;
    } catch (error) {
      console.error(
        "Unable to rename task:",
        error
      );

      setError(error.message);

      return null;
    }
  };

  const deleteTask = async (taskId) => {
    try {
      setError(null);

      await deleteTaskById(taskId);

      setTasks((currentTasks) =>
        currentTasks.filter(
          (task) => task.id !== taskId
        )
      );

      if (selectedTaskId === taskId) {
        setSelectedTaskId(null);
      }

      return true;
    } catch (error) {
      console.error(
        "Unable to delete task:",
        error
      );

      setError(error.message);

      return false;
    }
  };

  const selectTask = (taskId) => {
    setSelectedTaskId((currentId) =>
      currentId === taskId
        ? null
        : taskId
    );
  };

  const selectedTask = useMemo(() => {
    return (
      tasks.find(
        (task) =>
          task.id === selectedTaskId
      ) || null
    );
  }, [
    tasks,
    selectedTaskId,
  ]);

  const incrementTaskPomodoro =
    async (taskId) => {
      if (!taskId) {
        return null;
      }

      try {
        setError(null);

        const updatedTask =
          await incrementTaskPomodoroById(
            taskId
          );

        setTasks((currentTasks) =>
          currentTasks.map((task) =>
            task.id === taskId
              ? updatedTask
              : task
          )
        );

        return updatedTask;
      } catch (error) {
        console.error(
          "Unable to increment task Pomodoro:",
          error
        );

        setError(error.message);

        return null;
      }
    };

  return {
    tasks,

    selectedTask,
    selectedTaskId,

    isLoading,
    error,

    addTask,
    toggleTask,
    updateTaskTitle,
    deleteTask,
    selectTask,
    incrementTaskPomodoro,
  };
};

export default useTasks;
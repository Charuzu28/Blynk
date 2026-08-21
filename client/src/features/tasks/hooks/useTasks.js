import { useEffect, useMemo, useState } from "react";

const STORAGE_KEY = "blynk_tasks_v2";
const SELECTED_TASK_KEY = "blynk_selected_task_v2";

const createTaskId = () => {
  return crypto.randomUUID();
};

const useTasks = () => {
  const [tasks, setTasks] = useState(() => {
    try {
      const savedTasks = localStorage.getItem(STORAGE_KEY);

      return savedTasks ? JSON.parse(savedTasks) : [];
    } catch {
      return [];
    }
  });

  const [selectedTaskId, setSelectedTaskId] = useState(() => {
    return localStorage.getItem(SELECTED_TASK_KEY) || null;
  });

  useEffect(() => {
    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify(tasks)
    );
  }, [tasks]);

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

  const addTask = (
    title,
    estimatedPomodoros = 1
  ) => {
    const cleanTitle = title.trim();

    if (!cleanTitle) {
      return;
    }

    const task = {
      id: createTaskId(),
      title: cleanTitle,
      completed: false,
      estimatedPomodoros,
      completedPomodoros: 0,
      createdAt: new Date().toISOString(),
    };

    setTasks((currentTasks) => [
      ...currentTasks,
      task,
    ]);

    return task;
  };

  const toggleTask = (taskId) => {
    setTasks((currentTasks) =>
      currentTasks.map((task) =>
        task.id === taskId
          ? {
              ...task,
              completed: !task.completed,
            }
          : task
      )
    );
  };

  const updateTaskTitle = (
    taskId,
    nextTitle
  ) => {
    const cleanTitle = nextTitle.trim();

    if (!cleanTitle) {
      return;
    }

    setTasks((currentTasks) =>
      currentTasks.map((task) =>
        task.id === taskId
          ? {
              ...task,
              title: cleanTitle,
            }
          : task
      )
    );
  };

  const deleteTask = (taskId) => {
    setTasks((currentTasks) =>
      currentTasks.filter(
        (task) => task.id !== taskId
      )
    );

    if (selectedTaskId === taskId) {
      setSelectedTaskId(null);
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
  }, [tasks, selectedTaskId]);

  const incrementTaskPomodoro = (taskId) => {
  if (!taskId) {
    return;
  }

  setTasks((currentTasks) =>
    currentTasks.map((task) =>
      task.id === taskId
        ? {
            ...task,
            completedPomodoros:
              task.completedPomodoros + 1,
          }
        : task
    )
  );
};

  return {
  tasks,
  selectedTask,
  selectedTaskId,

  addTask,
  toggleTask,
  updateTaskTitle,
  deleteTask,
  selectTask,
  incrementTaskPomodoro,
};

};

export default useTasks;
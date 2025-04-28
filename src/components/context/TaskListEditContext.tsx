import { ReactNode } from "@tanstack/react-router";
import { createContext, useContext, useState } from "react";

interface TaskListEditContext {
  editableId: string | null;
  setEditableId: (id: string | null) => void;
}

export const TaskListEditContext = createContext<TaskListEditContext | null>(
  null,
);

export const useTaskListEditContext = () => {
  const context = useContext(TaskListEditContext);
  if (context === null) {
    throw new Error(
      "useTaskListEditContext must be used within TaskListEditContext",
    );
  }
  return context;
};

export function TaskListProvider({ children }: { children: ReactNode }) {
  const [editableId, setEditableId] = useState<string | null>(null);
  const context: TaskListEditContext = {
    editableId,
    setEditableId,
  };

  return (
    <TaskListEditContext.Provider value={context}>
      {children}
    </TaskListEditContext.Provider>
  );
}

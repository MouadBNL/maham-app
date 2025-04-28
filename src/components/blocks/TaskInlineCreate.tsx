import { useState } from "react";
import TaskForm from "./TaskForm";
import { PlusIcon } from "lucide-react";
import { Task } from "@/db/models";
import TaskRepository from "@/db/repositories/TaskRepository";

type Props = {
  task?: Partial<Task>;
};

export default function TaskInlineCreate({ task }: Props) {
  const [isCreating, setIsCreating] = useState(false);
  const onCreate = async (data: Task) => {
    await TaskRepository.save(data);
    setIsCreating(false);
  };
  return (
    <>
      {isCreating ? (
        <div className="mt-2 rounded border p-2">
          <TaskForm
            task={task}
            onSubmit={onCreate}
            onCancel={() => setIsCreating(false)}
          />
        </div>
      ) : (
        <div className="px-4 py-2">
          <span
            onClick={() => setIsCreating(true)}
            className="text-muted-foreground hover:text-accent-foreground flex cursor-pointer items-center justify-start gap-2 text-sm"
          >
            <PlusIcon size={14} />
            Add Task
          </span>
        </div>
      )}
    </>
  );
}

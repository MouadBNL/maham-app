import TaskForm from "../blocks/TaskForm";
import { useTaskCreate } from "@/services/task";
import { Task } from "@/db/models";
import { toast } from "sonner";

export default function TaskCreateContainer({
  onCreated,
  onCancel,
  onFinished,
}: {
  onCreated: (data: Task | undefined) => void;
  onCancel: () => void;
  onFinished: () => void;
}) {
  const { mutateAsync: createTask } = useTaskCreate();
  const onSubmit = (data: Task) => {
    createTask(data, {
      onSuccess: (data) => onCreated?.(data),
      onError(error, variables, context) {
        toast.error("Could not create task");
      },
      onSettled: () => {},
    });
  };
  return <TaskForm onSubmit={onSubmit} onCancel={onFinished} />;
}

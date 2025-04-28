import { Task } from "@/db/models";
import { useTaskListEditContext } from "../context/TaskListEditContext";
import TaskForm from "./TaskForm";
import TaskItem from "./TaskItem";
import TaskRepository from "@/db/repositories/TaskRepository";

export default function TaskItemEditable({ task }: { task: Task }) {
  const ctx = useTaskListEditContext();

  const onTaskUpdate = async (newTask: Task) => {
    await TaskRepository.update(newTask);
    ctx.setEditableId(null);
  };

  const onTaskDelete = (id: string) => {
    TaskRepository.delete(id);
  };

  const onCompletedUpdate = (isCompleted: boolean) => {
    TaskRepository.update({
      ...task,
      completed_at: isCompleted ? new Date() : null,
    });
  };

  return (
    <div className="py-1">
      {ctx.editableId == task.id ? (
        <div className="rounded border p-2">
          <TaskForm
            task={task}
            onSubmit={onTaskUpdate}
            onCancel={() => ctx.setEditableId(null)}
          />
        </div>
      ) : (
        <TaskItem>
          <TaskItem.Checkbox
            value={!!task.completed_at}
            onChange={onCompletedUpdate}
          />
          <TaskItem.Details>
            <TaskItem.Title>{task.title}</TaskItem.Title>
            <TaskItem.DueDate dueDate={task.due_at} />
          </TaskItem.Details>
          <TaskItem.Actions>
            <TaskItem.ActionEdit onClick={() => ctx.setEditableId(task.id!)} />
            <TaskItem.ActionDelete onClick={() => onTaskDelete(task.id!)} />
          </TaskItem.Actions>
        </TaskItem>
      )}
    </div>
  );
}

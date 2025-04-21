import AppContainer from "@/components/blocks/AppContainer";
import AppHeader from "@/components/blocks/AppHeader";
import TaskForm from "@/components/blocks/TaskForm";
import TaskItem from "@/components/blocks/TaskItem";
import TaskListContainer from "@/components/blocks/TaskListContainer";
import { Heading2 } from "@/components/ui/typography";
import { dxdb } from "@/db";
import { ITask } from "@/validators";
import { createFileRoute } from "@tanstack/react-router";
import { useLiveQuery } from "dexie-react-hooks";
import { PlusIcon } from "lucide-react";
import { useState } from "react";

export const Route = createFileRoute("/app/projects/$slug")({
  component: RouteComponent,  
});

function RouteComponent() {
  console.log("rerendering....");
  const { slug } = Route.useParams();
  const project = useLiveQuery(async () => {
    const data = await dxdb.getProject(slug);
    return { ...data };
  }, [slug]);

  const [editingId, setEditingId] = useState<string | null>(null);

  const onTaskCreate = async (task: ITask) => {
    await dxdb.createTask({
      title: task.task,
      project_id: project?.id,
      due_at: task.dueDate,
    });
    setEditingId(null);
  };

  const onTaskCompletedAtChange = async (id: string, isCompleted: boolean) => {
    await dxdb.updateTask(id, {
      completed_at: isCompleted ? new Date() : undefined,
    });
  };

  const onTaskUpdate = async (task: ITask) => {
    if (task.id) {
      await dxdb.updateTask(task.id, {
        title: task.task,
        due_at: task.dueDate,
      });
    }
    setEditingId(null);
  };

  const onTaskDelete = async (id: string) => {
    await dxdb.deleteTask(id);
  };

  return (
    <>
      <AppHeader>
        <Heading2>{project?.name}</Heading2>
      </AppHeader>
      <AppContainer>
        <TaskListContainer>
          {project?.tasks &&
            project.tasks.map((task) => (
              <div key={task.id} className="py-1">
                {editingId == task.id ? (
                  <div className="border rounded p-2">
                    <TaskForm
                      task={{
                        id: task.id,
                        task: task.title,
                        dueDate: task.due_at,
                        priority: null,
                        completedAt: task.completed_at ?? null,
                      }}
                      onSubmit={onTaskUpdate}
                      onCancel={() => setEditingId(null)}
                    />
                  </div>
                ) : (
                  <TaskItem>
                    <TaskItem.Checkbox
                      value={!!task.completed_at}
                      onChange={(isCompleted) =>
                        onTaskCompletedAtChange(task.id, isCompleted)
                      }
                    />
                    <TaskItem.Details>
                      <TaskItem.Title>{task.title}</TaskItem.Title>
                      <TaskItem.DueDate dueDate={task.due_at} />
                    </TaskItem.Details>
                    <TaskItem.Actions>
                      <TaskItem.ActionEdit
                        onClick={() => setEditingId(task.id)}
                      />
                      <TaskItem.ActionDelete
                        onClick={() => onTaskDelete(task.id)}
                      />
                    </TaskItem.Actions>
                  </TaskItem>
                )}
              </div>
            ))}

          {editingId == "NEW" ? (
            <div className="border rounded p-2 mt-2">
              <TaskForm
                onSubmit={onTaskCreate}
                onCancel={() => setEditingId(null)}
              />
            </div>
          ) : (
            <div className="py-2 px-4 ">
              <span
                onClick={() => {
                  setEditingId("NEW");
                }}
                className="flex items-center justify-start text-sm gap-2 text-muted-foreground hover:text-accent-foreground   cursor-pointer"
              >
                <PlusIcon size={14} />
                Add Task
              </span>
            </div>
          )}
        </TaskListContainer>
      </AppContainer>
    </>
  );
}

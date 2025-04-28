import TaskRepository from "@/db/repositories/TaskRepository";
import { useLiveQuery } from "dexie-react-hooks";
import TaskInlineCreate from "../blocks/TaskInlineCreate";
import TaskItemEditable from "../blocks/TaskItemEditable";
import { TaskListProvider } from "../context/TaskListEditContext";

type Props = {
  projectId: string | null;
};
export default function TasksContainer({ projectId }: Props) {
  const tasks = useLiveQuery(
    () => TaskRepository.byProject(projectId),
    [projectId],
  );

  return (
    <TaskListProvider>
      <div className="divide-y">
        {tasks?.map((task) => <TaskItemEditable key={task.id} task={task} />)}

        <TaskInlineCreate task={{ project_id: projectId }} />
      </div>
    </TaskListProvider>
  );
}

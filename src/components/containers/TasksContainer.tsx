import TaskRepository from "@/db/repositories/TaskRepository";
import { useLiveQuery } from "dexie-react-hooks";
import TaskInlineCreate from "../blocks/TaskInlineCreate";
import TaskItemEditable from "../blocks/TaskItemEditable";
import { TaskListProvider } from "../context/TaskListEditContext";
import SectionInlineCreate from "../blocks/SectionInlineCreate";
import SectionRepository from "@/db/repositories/SectionRepository";
import SectionContent from "../blocks/SectionContent";

type Props = {
  projectId: string | null;
};
export default function TasksContainer({ projectId }: Props) {
  const tasks = useLiveQuery(
    () => TaskRepository.byProjectAndSection(projectId, null),
    [projectId],
  );

  const sections = useLiveQuery(
    () => SectionRepository.byProject(projectId),
    [projectId],
  );

  return (
    <TaskListProvider>
      <div className="divide-y">
        {tasks?.map((task) => <TaskItemEditable key={task.id} task={task} />)}
        <TaskInlineCreate task={{ project_id: projectId }} />
      </div>
      <SectionInlineCreate section={{ project_id: projectId }} />
      {sections?.map((section) => (
        <SectionContent
          section={section}
          projectId={projectId}
          key={section.id}
        />
      ))}
    </TaskListProvider>
  );
}

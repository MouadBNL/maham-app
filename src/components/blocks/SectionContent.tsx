import { Section } from "@/db/models";
import TaskRepository from "@/db/repositories/TaskRepository";
import { useLiveQuery } from "dexie-react-hooks";
import TaskItemEditable from "./TaskItemEditable";
import TaskInlineCreate from "./TaskInlineCreate";
import SectionInlineCreate from "./SectionInlineCreate";
import { ChevronDown, ChevronRight, EllipsisIcon } from "lucide-react";
import { Button } from "../ui/button";
import SectionRepository from "@/db/repositories/SectionRepository";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";

export default function SectionContent({
  projectId,
  section,
}: {
  projectId: string | null;
  section: Section;
}) {
  const tasks = useLiveQuery(() =>
    TaskRepository.byProjectAndSection(projectId, section.id!),
  );

  const toggleExpand = async () => {
    await SectionRepository.update({ ...section, expanded: !section.expanded });
  };

  const onDeleteSection = async () => {
    await SectionRepository.delete(section.id!);
  };

  const count = tasks?.filter((e) => !e.completed_at).length;

  return (
    <div key={section.id}>
      <div className="flex items-center gap-4 border-b pb-2">
        {!!section.expanded ? (
          <Button size="xs" variant="ghost" onClick={toggleExpand}>
            <ChevronDown />
          </Button>
        ) : (
          <Button size="xs" variant="ghost" onClick={toggleExpand}>
            <ChevronRight />
          </Button>
        )}
        <span className="text-sm font-semibold">{section.name}</span>
        <span className="text-xs opacity-35">{count}</span>
        <div className="ml-auto">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button size="xs" variant="ghost">
                <EllipsisIcon />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem onClick={onDeleteSection}>
                Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
      {!!section.expanded && (
        <div className="divide-y">
          {tasks?.map((task) => <TaskItemEditable key={task.id} task={task} />)}
          <TaskInlineCreate
            task={{ project_id: projectId, section_id: section.id! }}
          />
        </div>
      )}
      <SectionInlineCreate section={{ project_id: projectId }} />
    </div>
  );
}

import AppContent from "@/components/blocks/AppContent";
import AppHeader from "@/components/blocks/AppHeader";
import TasksContainer from "@/components/containers/TasksContainer";
import { Heading2 } from "@/components/ui/typography";
import ProjectRepository from "@/db/repositories/ProjectRepository";
import { createFileRoute } from "@tanstack/react-router";
import { useLiveQuery } from "dexie-react-hooks";

export const Route = createFileRoute("/app/projects/$slug")({
  component: RouteComponent,
});

function RouteComponent() {
  const { slug } = Route.useParams();
  const project = useLiveQuery(() => {
    return ProjectRepository.show(slug);
  }, [slug]);
  if (!project) return;

  return (
    <>
      <AppHeader>
        <Heading2>{project?.name}</Heading2>
      </AppHeader>
      <AppContent>
        <TasksContainer projectId={project.id!} key={slug} />
      </AppContent>
    </>
  );
}

import AppContent from "@/components/blocks/AppContent";
import AppHeader from "@/components/blocks/AppHeader";
import { Heading2 } from "@/components/ui/typography";
import { createFileRoute } from "@tanstack/react-router";
import TasksContainer from "@/components/containers/TasksContainer";

export const Route = createFileRoute("/app/inbox")({
  component: RouteComponent,
  head: () => ({
    meta: [{ title: "Maham App | Inbox" }],
  }),
});

function RouteComponent() {
  return (
    <>
      <AppHeader>
        <Heading2>Inbox</Heading2>
      </AppHeader>
      <AppContent>
        <TasksContainer projectId={null} />
      </AppContent>
    </>
  );
}

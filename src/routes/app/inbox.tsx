import AppContent from "@/components/blocks/AppContent";
import AppHeader from "@/components/blocks/AppHeader";
import { Heading2 } from "@/components/ui/typography";
import { createFileRoute } from "@tanstack/react-router";
import TasksContainer from "@/components/containers/TasksContainer";
import MarkdownEditor from "@/components/blocks/MarkdownEditor";
import { useState } from "react";

export const Route = createFileRoute("/app/inbox")({
  component: RouteComponent,
  head: () => ({
    meta: [{ title: "Maham App | Inbox" }],
  }),
});

function RouteComponent() {
  const [content, setContent] = useState("");
  return (
    <>
      <AppHeader>
        <Heading2>Inbox</Heading2>
      </AppHeader>
      <AppContent>
        <TasksContainer projectId={null} />

        <div>
          <MarkdownEditor value={content} onChange={setContent} />
          <pre>{content}</pre>
        </div>
      </AppContent>
    </>
  );
}

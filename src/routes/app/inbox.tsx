import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/app/inbox")({
  component: RouteComponent,
  head: () => ({
    meta: [{ title: "Maham App | Notes  " }],
  }),
});

function RouteComponent() {
    return <div>Hello "/app/notes"!</div>;
  }

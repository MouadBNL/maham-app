import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_static/about")({
  component: RouteComponent,
  head: () => ({
    meta: [{ title: "Maham App | About" }],
  }),
});

function RouteComponent() {
  return <div>Page In Progress...</div>;
}

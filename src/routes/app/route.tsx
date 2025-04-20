import { createFileRoute, Link, Outlet } from "@tanstack/react-router";

export const Route = createFileRoute("/app")({
  component: RouteComponent,
  head: () => ({
    meta: [{ title: "Maham App" }],
  }),
});

function RouteComponent() {
  return (
    <main style={{ width: "80%", margin: "auto" }}>
      <nav>
        <ul>
          <Link to="/app">
            <li>Dashboard</li>
          </Link>
          <Link to="/app/inbox">
            <li>Inbox</li>
          </Link>
        </ul>
      </nav>
      <Outlet />
    </main>
  );
}

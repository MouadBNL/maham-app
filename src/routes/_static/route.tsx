import { Button } from "@/components/ui/button";
import { createFileRoute, Link, Outlet } from "@tanstack/react-router";

export const Route = createFileRoute("/_static")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <>
      <div className="p-2 flex gap-2">
        <Button asChild>
          <Link to="/" className="[&.active]:bg-gray-800">
            Home
          </Link>
        </Button>
        <Button asChild>
          <Link to="/about" className="[&.active]:bg-gray-800">
            About
          </Link>
        </Button>

        <Button asChild>
          <Link to="/app" className="[&.active]:bg-gray-800">
            Dashboard
          </Link>
        </Button>
      </div>
      <hr />
      <Outlet />
    </>
  );
}

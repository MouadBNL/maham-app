import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_static/")({
  component: RouteComponent,
  head: () => ({
    meta: [{ title: "Maham App | Home page" }],
  }),
});

function RouteComponent() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gray-50">
      <div className="max-w-2xl space-y-6 text-center">
        <h1 className="text-4xl font-bold text-gray-900">
          Stay Organized, Get More Done
        </h1>
        <p className="text-lg text-gray-600">
          Manage your tasks, projects, and goals all in one place.
        </p>
        <button className="rounded-lg bg-blue-600 px-6 py-3 text-white transition-colors hover:bg-blue-700">
          Get Started
        </button>
      </div>
    </div>
  );
}

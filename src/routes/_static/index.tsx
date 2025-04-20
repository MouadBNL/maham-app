import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_static/")({
  component: RouteComponent,
  head: () => ({
    meta: [{ title: "Maham App | Home page" }],
  }),
});

function RouteComponent() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center">
      <div className="max-w-2xl text-center space-y-6">
        <h1 className="text-4xl font-bold text-gray-900">
          Stay Organized, Get More Done
        </h1>
        <p className="text-lg text-gray-600">
          Manage your tasks, projects, and goals all in one place.
        </p>
        <button className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors">
          Get Started
        </button>
      </div>
    </div>
  );
}

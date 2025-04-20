import AppSidebar from "@/components/blocks/AppSidebar";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { createFileRoute, Outlet } from "@tanstack/react-router";

export const Route = createFileRoute("/app")({
  component: RouteComponent,
  head: () => ({
    meta: [{ title: "Maham App" }],
  }),
});

function RouteComponent() {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset className="w-full h-full">
        <Outlet />
      </SidebarInset>
    </SidebarProvider>
  );
}

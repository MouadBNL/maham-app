import { AlertDialogProvider } from "@/components/ui/alert-dialog";
import { createRootRoute, HeadContent, Outlet } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/react-router-devtools";

export const Route = createRootRoute({
  component: () => (
    <>
      <HeadContent />

      <AlertDialogProvider>
        <Outlet />
      </AlertDialogProvider>
      <TanStackRouterDevtools />
    </>
  ),
});

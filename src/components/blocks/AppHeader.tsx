import { PropsWithChildren } from "react";
import AppContent from "./AppContent";

export default function AppHeader({ children }: PropsWithChildren) {
  return (
    <AppContent>
      <div className="h-16"></div>
      {children}
    </AppContent>
  );
}

import { PropsWithChildren } from "react";
import AppContainer from "./AppContainer";

export default function AppHeader({ children }: PropsWithChildren) {
  return (
    <AppContainer>
      <div className="h-16"></div>
      {children}
    </AppContainer>
  );
}

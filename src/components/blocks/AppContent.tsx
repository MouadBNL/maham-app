import { ReactNode } from "react";

export default function AppContent({ children }: { children: ReactNode }) {
  return (
    <div className="mx-14 my-1.5">
      <section className="mx-auto w-full max-w-[800px]">{children}</section>
    </div>
  );
}

import { ReactNode } from "react";

export default function AppContainer({ children }: { children: ReactNode }) {
  return (
    <div className="my-1.5 mx-14">
      <section className="w-full max-w-[800px] mx-auto">{children}</section>
    </div>
  );
}

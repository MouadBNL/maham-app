import React from "react";

export default function TaskListContainer({
  children,
}: React.PropsWithChildren) {
  return <div className="divide-y">{children}</div>;
}

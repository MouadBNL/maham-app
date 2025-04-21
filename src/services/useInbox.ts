import TaskRepository from "@/db/repositories/TaskRepository";
import { useLiveQuery } from "dexie-react-hooks";

export function useInbox() {
  return useLiveQuery(() => TaskRepository.byProject(null));
}

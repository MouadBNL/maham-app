import TaskRepository from "@/db/repositories/TaskRepository";
import { useMutation } from "@tanstack/react-query";

export function useTaskCreate() {
  return useMutation({
    mutationFn: TaskRepository.save,
  });
}

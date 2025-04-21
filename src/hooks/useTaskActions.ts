import { Task } from "@/db/models";
import TaskRepository from "@/db/repositories/TaskRepository";
import {
  QueryFunction,
  QueryKey,
  useMutation,
  UseMutationOptions,
  useQuery,
  UseQueryOptions,
} from "@tanstack/react-query";


export function useTaskUpdate(opt?: UseMutationOptions<Task>) {
  return useMutation({
    mutationFn: TaskRepository.update,
  });
}

export function useTaskDelete(opt?: UseMutationOptions<Task>) {
  return useMutation({
    mutationFn: TaskRepository.delete,
  });
}

const useQueryFactory =
  <
    TQueryFnData = unknown,
    TError = unknown,
    TData = TQueryFnData,
    TQueryKey extends QueryKey = QueryKey,
  >(
    queryKey: TQueryKey,
    queryFn: QueryFunction<TQueryFnData, TQueryKey>,
  ) =>
  <SelectType = TData>(
    options?: Omit<
      UseQueryOptions<TQueryFnData, TError, SelectType, TQueryKey>,
      "queryKey" | "queryFn"
    >,
  ) => {
    return useQuery(queryKey, queryFn, options);
  };


  const useMutationFactory =
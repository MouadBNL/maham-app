"use client";
import { Form, FormControl, FormField, FormItem } from "../ui/form";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from "../ui/select";
// import { XIcon } from "lucide-react";
import { DateTimePicker } from "../ui/date-time-picker";
import { Task, TaskSchema } from "@/db/models";

export default function TaskForm({
  onSubmit,
  onCancel,
  task,
}: {
  onSubmit: (data: Task) => void;
  onCancel?: () => void;
  task?: Partial<Task>;
}) {
  const form = useForm<Task>({
    resolver: zodResolver(TaskSchema),
    defaultValues: {
      title: "",
      due_at: new Date(),
      completed_at: null,
      // priority: null,
      ...task,
    },
  });

  const handleSubmit = async (data: Task) => {
    await onSubmit(data);
  };

  return (
    <Form {...form}>
      <form
        className="flex flex-col gap-4"
        onSubmit={form.handleSubmit(handleSubmit)}
      >
        {/* {form.formState.errors && (
          <FormMessage>{JSON.stringify(form.formState.errors)}</FormMessage>
        )} */}
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              {/* <FormLabel>Task</FormLabel> */}
              <FormControl>
                <Input placeholder="Enter your task" {...field} autoFocus />
              </FormControl>
            </FormItem>
          )}
        />

        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div className="flex gap-4">
            <FormField
              control={form.control}
              name="due_at"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <DateTimePicker {...field} size="sm" />
                  </FormControl>
                </FormItem>
              )}
            />

            {/* <FormField
              control={form.control}
              name="priority"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Select
                      key={field.value}
                      defaultValue={field.value ?? undefined}
                      onValueChange={field.onChange}
                    >
                      <span className="relative">
                        <SelectTrigger size="sm">
                          <SelectValue placeholder="Priority" />
                        </SelectTrigger>
                        {field.value && (
                          <button
                            className="absolute top-1/2 right-4 z-50 -translate-y-1/2 cursor-pointer bg-white"
                            onClick={() => field.onChange(null)}
                          >
                            <XIcon size={12} />
                          </button>
                        )}
                      </span>
                      <SelectContent>
                        <SelectItem value="low">Low</SelectItem>
                        <SelectItem value="medium">Medium</SelectItem>
                        <SelectItem value="high">High</SelectItem>
                      </SelectContent>
                    </Select>
                  </FormControl>
                </FormItem>
              )}
            /> */}
          </div>
          <div className="flex items-center justify-end gap-4">
            <Button
              variant="secondary"
              onClick={onCancel}
              type="button"
              size="sm"
            >
              Cancel
            </Button>

            <Button
              type="submit"
              disabled={form.formState.isSubmitting}
              size="sm"
            >
              {form.formState.isSubmitting ? "Submitting..." : "Submit"}
            </Button>
          </div>
        </div>
      </form>
    </Form>
  );
}

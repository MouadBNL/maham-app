import { z } from "zod";

export const taskSchema = z.object({
  id: z.string().optional(),
  project_id: z.string().optional().nullable(),
  title: z.string().min(1, { message: "The task title is required" }),
  due_at: z.date(),
  priority: z.enum(["low", "medium", "high"]).nullable(),
  completed_at: z.date().nullable(),
  created_at: z.date().optional(),
  updated_at: z.date().optional(),
});

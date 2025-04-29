import { z } from "zod";
import AbstractDBModel from "./model";

export const TaskSchema = z.object({
  id: z.string().optional(),
  project_id: z.string().optional().nullable(),
  section_id: z.string().optional().nullable(),
  title: z.string().min(1, { message: "The task title is required" }),
  due_at: z.date(),
  // priority: z.enum(["low", "medium", "high"]).nullable(),
  completed_at: z.date().nullable(),
  created_at: z.date().optional(),
  updated_at: z.date().optional(),
});

export type Task = AbstractDBModel & z.infer<typeof TaskSchema>;

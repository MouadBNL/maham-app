import { z } from "zod";
import AbstractDBModel from "./model";
import { Task } from "./task";
import { Project } from "./project";

export const SectionSchema = z.object({
  id: z.string().optional(),
  project_id: z.string().optional().nullable(),
  name: z.string().min(1, { message: "The section name is required" }),
  expanded: z.boolean().optional().nullable(),
  archived_at: z.date().optional().nullable(),
  created_at: z.date().optional(),
  updated_at: z.date().optional(),
});

export type SectionRelations = {
  tasks?: Task[];
  project?: Project;
};

export type Section = AbstractDBModel &
  z.infer<typeof SectionSchema> &
  SectionRelations;

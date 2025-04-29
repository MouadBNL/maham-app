import Dexie, { Table } from "dexie";
import { Project, Section, Task } from "./models";

// &:
export class MahamDB extends Dexie {
  tasks!: Table<Task, string>;
  projects!: Table<Project, string>;
  sections!: Table<Section, string>;

  constructor() {
    super("MahamDB");
    this.version(8)
      .stores({
        tasks:
          "&id, project_id, section_id, title, due_at, completed_at, created_at, updated_at",
        projects: "&id, name, &slug, created_at, updated_at",
        sections:
          "&id, project_id, name, expanded, archived_at, created_at, updated_at",
      })
      .upgrade((transaction) => {
        return transaction
          .table("tasks")
          .toCollection()
          .modify((e: Task) => {
            if (!e.project_id) e.project_id = null;
            if (!e.section_id) e.section_id = null;
          });
      })
      .upgrade((transaction) => {
        return transaction
          .table("sections")
          .toCollection()
          .modify((e: Section) => {
            e.expanded = !!e.expanded;
          });
      });
  }
}

export const dxdb = new MahamDB();

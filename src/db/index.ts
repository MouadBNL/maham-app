import Dexie, { Table } from "dexie";
import { Project, Task } from "./models";

export class MahamDB extends Dexie {
  tasks!: Table<Task, string>;
  projects!: Table<Project, string>;

  constructor() {
    super("MahamDB");
    this.version(4).stores({
      tasks:
        "&id, project_id, title, due_at, completed_at, created_at, updated_at",
      projects: "&id, name, &slug, created_at, updated_at",
    });
  }
}

export const dxdb = new MahamDB();

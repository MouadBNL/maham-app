import { dxdb } from "..";
import { Task } from "../models";
import Repository from "./repository";

class TaskRepository extends Repository<Task> {
  constructor() {
    super(dxdb.tasks, dxdb);
  }

  async byProject(project_id: string | null) {
    const data = await this.list();

    return data.filter((e) => e.project_id == project_id);
  }

  async byProjectAndSection(
    project_id: string | null,
    section_id: string | null,
  ) {
    const data = await this.list();

    return data.filter(
      (e) => e.project_id == project_id && e.section_id == section_id,
    );
  }
}

export default new TaskRepository();

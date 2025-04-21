import { dxdb } from "..";
import { Task } from "../models";
import Repository from "./repository";

class TaskRepository extends Repository<Task> {
  constructor() {
    super(dxdb.tasks, dxdb);
  }

  async byProject(project_id: string | null) {
    return await this.search({ project_id });
  }
}

export default new TaskRepository();

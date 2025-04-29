import { dxdb } from "..";
import { Section } from "../models";
import Repository from "./repository";
import TaskRepository from "./TaskRepository";

class SectionRepository extends Repository<Section> {
  constructor() {
    super(dxdb.sections, dxdb);
  }

  async byProject(project_id: string | null) {
    const data = await this.list();

    return data.filter((e) => e.project_id == project_id);
  }

  async delete(id: string) {
    const section = await this.find(id);
    if (!section) return;
    const tasks = await TaskRepository.byProjectAndSection(
      section.project_id!,
      section.id!,
    );
    tasks.map((t) => TaskRepository.delete(t.id!));
    this.table.delete(id);
  }
}

export default new SectionRepository();

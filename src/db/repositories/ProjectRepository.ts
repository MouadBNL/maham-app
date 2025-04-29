import { slugify } from "@/lib/utils";
import Repository from "./repository";
import { Project } from "../models";
import { dxdb } from "..";
import TaskRepository from "./TaskRepository";
import SectionRepository from "./SectionRepository";

class ProjectRepository extends Repository<Project> {
  constructor() {
    super(dxdb.projects, dxdb);
  }

  async show(slug: string) {
    return await this.table.where({ slug: slug }).first();
  }

  async save(project: Omit<Project, "id" | "created_at" | "updated_at">) {
    const id = crypto.randomUUID();
    return super.save({ ...project, slug: `${slugify(project.name)}-${id}` });
  }

  async delete(id: string) {
    const project = await this.find(id);
    if (!project) return;
    const tasks = await TaskRepository.byProject(id);
    tasks.map((t) => TaskRepository.delete(t.id!));
    const sections = await SectionRepository.byProject(id);
    sections.map((e) => SectionRepository.delete(e.id!));
    this.table.delete(id);
  }
}

export default new ProjectRepository();

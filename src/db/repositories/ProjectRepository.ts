import { slugify } from "@/lib/utils";
import Repository from "./repository";
import { Project } from "../models";
import { dxdb } from "..";

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
}

export default new ProjectRepository();

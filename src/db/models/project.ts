import AbstractDBModel from "./model";

export interface Project extends AbstractDBModel {
  name: string;
  slug: string;
}

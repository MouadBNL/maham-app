import { Table } from "dexie";
import { MahamDB } from "..";
import AbstractDBModel from "../models/model";
import { v4 as uuidv4 } from "uuid";

export default class Repository<T extends AbstractDBModel> {
  db: MahamDB;
  table: Table<T, string, T>;

  constructor(talbe: Table<T, string, T>, db: MahamDB) {
    this.db = db;
    this.table = talbe;
  }

  async find(id: string): Promise<T | undefined> {
    return await this.table.where({ id }).first();
  }

  async list(): Promise<T[]> {
    return (await this.table.reverse().sortBy("created_at")).reverse();
  }

  async count(): Promise<number> {
    const result = await this.list();
    return result.length;
  }

  async search(criteria: Record<string, any>): Promise<T[]> {
    return await this.table.where(criteria).toArray();
  }

  async save(
    entity: Omit<T, "id" | "created_at" | "updated_at">,
  ): Promise<T | undefined> {
    const item: T = {
      id: uuidv4(),
      ...entity,
      created_at: new Date(),
      updated_at: new Date(),
    } as any;
    const savedEntity = await this.table.add(item);
    return this.find(savedEntity);
  }

  async update(entity: Partial<Omit<T, "created_at" | "updated_at">>) {
    if (!entity.id) return;
    const item = {
      ...entity,
      updated_at: new Date(),
    } as any;
    this.table.update(entity.id, item);
  }

  async delete(id: string): Promise<void> {
    await this.table.delete(id);
  }
}

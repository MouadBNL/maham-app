import Dexie, { Table } from "dexie";

export interface DEX_Task {
  id: string;
  title: string;
  due_at: Date;
  completed_at?: Date;
  created_at: Date;
  updated_at: Date;
}

class MahamDB extends Dexie {
  tasks!: Table<DEX_Task, string>;

  constructor() {
    super("MahamDB");
    this.version(2).stores({
      tasks: "id, title, due_at, completed_at, updated_at",
    });
  }

  async getTasks() {
    return (await this.tasks.reverse().sortBy("created_at")).reverse();
  }

  async createTask(task: Omit<DEX_Task, "id" | "created_at" | "updated_at">) {
    const id = crypto.randomUUID();
    await this.tasks.add({
      id,
      ...task,
      created_at: new Date(),
      updated_at: new Date(),
    });
    return id;
  }

  async updateTask(
    id: string,
    task: Partial<Omit<DEX_Task, "id" | "created_at" | "updated_at">>
  ) {
    await this.tasks.update(id, {
      ...task,
      updated_at: new Date(),
    });
  }

  async deleteTask(id: string) {
    await this.tasks.delete(id);
  }
}

export const dxdb = new MahamDB();

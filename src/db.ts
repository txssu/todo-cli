import type * as T from "fp-ts/Task";
import type { Task } from "./models/task";

export const readDB: T.Task<Task[]> = () => Bun.file("./db.json").json();

export const writeDB =
  (db: Task[]): T.Task<number> =>
  () =>
    Bun.write("./db.json", JSON.stringify(db));

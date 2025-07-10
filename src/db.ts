import type * as T from "fp-ts/Task";
import * as TE from "fp-ts/TaskEither";
import type { Task } from "./models/task";

type DB = Task[];

const unsafeReadDB: T.Task<DB> = () => Bun.file("./db.json").json();

export const readDB: TE.TaskEither<string, DB> = TE.tryCatch(
  unsafeReadDB,
  () => "Can't read the database",
);

const unsafeWriteDB = (db: DB) => () =>
  Bun.write("./db.json", JSON.stringify(db));

export const writeDB = (db: DB) =>
  TE.tryCatch(unsafeWriteDB(db), () => "Can't read the database");

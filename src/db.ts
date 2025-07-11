import * as TE from "fp-ts/TaskEither";
import type { Task } from "./models/task";
import { constant, pipe } from "fp-ts/function";

type DB = Task[];

const databaseError = constant("DatabaseError");

const unsafeReadDB: Promise<DB> = Bun.file("./db.json").json() as Promise<DB>;

const unsafeWriteDB = (db: DB) => Bun.write("./db.json", JSON.stringify(db));

const putTask = (task: Task) => (db: DB) => [...db, task];

export const emptyDB: DB = [];

export const readDB: TE.TaskEither<string, DB> = TE.tryCatch(
  constant(unsafeReadDB),
  databaseError,
);

export const writeDB = TE.tryCatchK(unsafeWriteDB, databaseError);

export const putTaskDB = (task: Task) =>
  pipe(readDB, TE.map(putTask(task)), TE.flatMap(writeDB));

import type * as T from "fp-ts/Task";
import * as TE from "fp-ts/TaskEither";
import type { Task } from "./models/task";
import { pipe } from "fp-ts/function";

type DB = Task[];

export const emptyDB: DB = [];

const databaseReadError = () => "DatabaseReadError";

const unsafeDBReader: T.Task<DB> = () => Bun.file("./db.json").json();

export const readDB: TE.TaskEither<string, DB> = TE.tryCatch(
  unsafeDBReader,
  databaseReadError,
);

const unsafeDBWriter = (db: DB) => () =>
  Bun.write("./db.json", JSON.stringify(db));

export const writeDB = (db: DB) =>
  TE.tryCatch(unsafeDBWriter(db), databaseReadError);

const putTask = (task: Task) => (db: DB) => [...db, task];

export const putTaskDB = (task: Task) =>
  pipe(readDB, TE.map(putTask(task)), TE.flatMap(writeDB));
